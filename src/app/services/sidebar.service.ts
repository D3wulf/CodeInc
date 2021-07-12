import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]= [
    {
      titulo:'Dashboard',
      icon:'mdi mdi-gauge',
      submenu:[{
        titulo:'Main',
        url:'/'
      },{
        titulo:'Progress Bar',
        url:'progress'
      },{
        titulo:'Gráfica',
        url:'grafica1'
      },{
        titulo:'Promesas',
        url:'promesas'
      },{
        titulo:'Rxjs',
        url:'rxjs'
      }],
    },
    {
      titulo:'Mantenimiento',
      icon:'mdi mdi-folder-lock-open',
      submenu:[{
        titulo:'Usuarios',
        url:'usuarios'
      },{
        titulo:'Empresas',
        url:'empresas'
      },{
        titulo:'Trabajadores',
        url:'trabajadores'
      }],
    }
  ];

  constructor() { }
}
