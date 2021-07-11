import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from '../../services/usuario-service.service';

export interface Persona{

  name:string,
  mensaje:string,
  img:string,
  hora:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    li{
      cursor:pointer;
    }
    
    `

  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;
  public personas:Persona[]= [
    {
      name:'Mario Sánchez',
      mensaje:'Hola amigo! Necesitamos un currante como tu!11',
      img:"../assets/images/users/d2.jpg",
      hora:"15:30 PM"

  },{
    name:'Angie Villalba',
    mensaje:'Hola Miguel A. Estamos interesados en tu trabajo actual!',
    img:"../assets/images/users/4.jpg",
    hora:"09:05 AM"

},{
  name:'Cristina Farfán',
  mensaje:'Wow! Nos encanta tu página, contacta en nuestro LinkedIn!',
  img:"../assets/images/users/6.jpg",
  hora:"11:30 AM"

},]

  constructor(private us:UsuarioServiceService) {
    this.usuario = us.usuario;
    console.log(`hola desde ${this.usuario.img}`);
   }

  

  //LOGOUT
  logout(){

    this.us.logout();
  }

  ngOnInit(): void {
  }

}
