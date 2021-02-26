import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


import { Mensaje } from '../Interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  public usuario: any = {};


  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
    
    this.auth.authState.subscribe( (user:any) => {
      
      console.log('Estado del usuario: ' + user);
      
      if(!user){
        return;
      }else{
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        console.log(this.usuario);
        
      }
      
    });

  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));

    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      //console.log(mensajes);
      //this.chats = mensajes;

      this.chats = [];

      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      
    }))
  }

  agregarMensaje(texto: string){

    //TODO: Falta id usuario
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);
  }

  login(proveedor: string) {

    if(proveedor == 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());

    }else{
      
      this.auth.signInWithPopup(new auth.TwitterAuthProvider()).then(resp => {
        console.log(resp);
        
      }).catch(err => {
        console.log(err);
        
      });
    }
  }
  logout() {

    this.usuario = {};
    this.auth.signOut();

  }
}
