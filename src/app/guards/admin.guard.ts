import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UsuarioServiceService } from '../services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService:UsuarioServiceService,
    private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): boolean{

      if(this.usuarioService.role === 'ADMIN_ROLE'){

        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;

      }

    }
    
    



    
  
  
}
