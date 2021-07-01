import { NgModule, PipeTransform } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { ErrorpageComponent } from './errorpage/errorpage.component';


const routes: Routes = [

  //Lazyload
  // {
  //   path: 'dashboard',
  //   loadChildren: ()=> import('./pages/pages.module').then(m=> m.PagesModule)

  // },
  // {
  //   path: 'auth',
  //   loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule)

  // },
  {
    path:'',
    redirectTo:'/dashboard',
    pathMatch:'full'
  },
  
  {
    path:'error', component:ErrorpageComponent
  },

  {
    path:'**', component:ErrorpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PagesRoutingModule,AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
