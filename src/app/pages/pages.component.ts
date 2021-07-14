import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
//esto lo hemos hecho para llamar una funcion que hay en un archivo js (custom.js)
//que es para que se inicialice la funcion. 
//EL archivo custom.js es llamado desde el index.html
//Video 68 Uso de scripts de archivos importados en el index en typescript
declare function funcionInicioPersonal():any;
  


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  
  constructor(private settingsService:SettingsService, private sidebarService:SidebarService) { }

  ngOnInit(): void {
    funcionInicioPersonal();
    this.sidebarService.cargaMenu();
    //console.log(this.sidebarService.menu);
  }

  

}
