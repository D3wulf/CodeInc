import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //Modoficamos el menu porque ahora viene del backend

  public usuario:Usuario;
  menuItems:any[]=[];

  constructor(public sidebarService:SidebarService,
    private us:UsuarioServiceService) {
    this.usuario = us.usuario;
    this.sidebarService.cargaMenu()
    //console.log(this.sidebarService.menu);
    
    this.menuItems = sidebarService.menu;
    
   }

  ngOnInit(): void {
  }

}
