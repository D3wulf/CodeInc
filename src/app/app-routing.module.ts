import { NgModule, PipeTransform } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';

import { PagesComponent } from './pages/pages.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';

const routes: Routes = [
  //Rutas protegidas
  {
    path:'', component:PagesComponent,

    //RUTAS HIJAS, UNA OPCION VALIDA Y SIMPLE SIN USAR EL MODULO
    children:[
      {
        path:'dashboard', component:DashboardComponent
      },{
        path:'progress', component:ProgressComponent
      },
      {
        path:'grafica1', component: Grafica1Component
      },
      {
        path:'', redirectTo:'dashboard',pathMatch:'full'
      },

    ]
  },
  //rutas públicas
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },{
    path:'error', component:ErrorpageComponent
  },

  {
    path:'**', component:ErrorpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
