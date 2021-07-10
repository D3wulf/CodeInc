import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UsuarioServiceService } from '../services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private us:UsuarioServiceService, private router:Router){}

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
