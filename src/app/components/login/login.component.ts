import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicio: ChatService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    //console.log(proveedor);
  
    this.servicio.login(proveedor);

    
    
  }

  salir(){
    
  }

}
