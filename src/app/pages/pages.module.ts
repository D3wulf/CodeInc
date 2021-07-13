import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ComponentsModule } from '../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { EmpresasComponent } from './mantenimiento/empresas/empresas.component';
import { TrabajadoresComponent } from './mantenimiento/trabajadores/trabajadores.component';
import { PipesModule } from '../pipes/pipes.module';
import { TrabajadorComponent } from './mantenimiento/trabajadores/trabajador.component';






@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    EmpresasComponent,
    TrabajadoresComponent,
    TrabajadorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule, 
    PipesModule
    
  ],
  exports:[
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
