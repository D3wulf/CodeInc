import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';



const routes: Routes = [
    //Rutas protegidas
  {
    path:'dashboard', 
    component:PagesComponent,
    //el guard
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
     
    loadChildren:()=> import ('./child-routes.module').then(m=>m.ChildRoutesModule)
  },
    
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }