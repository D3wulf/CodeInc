import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';


const routes: Routes = [
    //Rutas protegidas
  {
    path:'dashboard', 
    component:PagesComponent,
    //el guard
    canActivate:[AuthGuard],

    //RUTAS HIJAS, UNA OPCION VALIDA Y SIMPLE SIN USAR EL MODULO

    //despues del componente se puede mandar data
    children:[
      {
        path:'', component:DashboardComponent, data:{titulo:'Dashboard'}
      },{
        path:'progress', component:ProgressComponent, data:{titulo:'Progress Bar'}
      },
      {
        path:'grafica1', component: Grafica1Component, data:{titulo:'Gráficas'}
      },
      {
        path:'account-settings', component: AccountSettingsComponent, data:{titulo:'Ajustes usuario'}
      },
      {
        path:'promesas', component: PromesasComponent, data:{titulo:'Ejercicios de promesas'}
      },{
        path:'rxjs', component: RxjsComponent, data:{titulo:'Rxjs Observables'}
      },
      {
        path:'perfil', component: PerfilComponent, data:{titulo:'Perfil Usuario'}
      },{
        path:'usuarios', component: UsuariosComponent, data:{titulo:'Usuarios'}
      },
      
      // {
      //   path:'', redirectTo:'dashboard',pathMatch:'full'
      // },

    ]
  },
    
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }