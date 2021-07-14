import { NgModule } from '@angular/core';


import { ChildRoutesRoutingModule } from './child-routes-routing.module';

    import { DashboardComponent } from './dashboard/dashboard.component';
    import { Grafica1Component } from './grafica1/grafica1.component';

    import { ProgressComponent } from './progress/progress.component';
    import { AccountSettingsComponent } from './account-settings/account-settings.component';
    import { PromesasComponent } from './promesas/promesas.component';
    import { RxjsComponent } from './rxjs/rxjs.component';

    import { PerfilComponent } from './perfil/perfil.component';
    import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
    import { EmpresasComponent } from './mantenimiento/empresas/empresas.component';
    import { TrabajadoresComponent } from './mantenimiento/trabajadores/trabajadores.component';
    import { TrabajadorComponent } from './mantenimiento/trabajadores/trabajador.component';
    import { BuscarComponent } from './buscar/buscar.component';
    import { AdminGuard } from '../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';

    const childRoutes:Routes = [

      { path:'', component:DashboardComponent, data:{titulo:'Dashboard'}
      },
      {path:'progress', component:ProgressComponent, data:{titulo:'Progress Bar'}
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
      },
      //Ruta Admin
      {
        path:'usuarios',canActivate:[AdminGuard], component: UsuariosComponent, data:{titulo:'Usuarios'}
      },{
        path:'empresas', component: EmpresasComponent, data:{titulo:'Empresas'}
      },{
        path:'trabajadores', component: TrabajadoresComponent, data:{titulo:'Trabajadores'}
      },{
        path:'trabajadores/:id', component: TrabajadorComponent, data:{titulo:'Trabajadores por id '}
      },{
        path:'buscar/:termino', component:BuscarComponent,data:{titulo:'Búsquedas en la web '}
      }
    ]


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports:[RouterModule]
})
export class ChildRoutesModule { }
