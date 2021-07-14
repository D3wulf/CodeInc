import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsuarioServiceService } from '../services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private us:UsuarioServiceService, private router:Router){}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.us.validarToken().pipe(
      tap(estaAuth=>{
        if(!estaAuth){
          this.router.navigateByUrl('/login');
        }
      })
    )



  }

 canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.us.validarToken().pipe(
      tap(estaAuth=>{
        if(!estaAuth){
          this.router.navigateByUrl('/login');
        }
      })
    )

  }
  
}
