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

  public usuario:Usuario;
  menuItems:any[]=[];

  constructor(private sidebarService:SidebarService,
    private us:UsuarioServiceService) {
    this.usuario = us.usuario;
    this.menuItems = sidebarService.menu;
    //console.log(this.menuItems);
   }

  ngOnInit(): void {
  }

}
