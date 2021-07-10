import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';





const url= environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  auth2: any;
 //fetch ---> javascript ES6     //angular--->httpclient--->observables


  constructor(private http:HttpClient,private router: Router,
    private ngZone: NgZone ) {this.googleInit();}

    googleInit() {

      return new Promise<void>( resolve => {
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: '1037253388562-rb8e9nhniinjk43r2o2vg0dl6fq3ofkk.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
          });
  
          resolve();
        });
      })
  
    }

    //LOGOUT
    logout(){

        localStorage.removeItem('token');
        
        this.auth2.signOut().then( ()=> {
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/login');
          })
          
        });
    }
    //QUeremos coger el token de google y tranformarlo en uno nuestro
    validarToken():Observable<boolean>{

      const token = localStorage.getItem('token') || '';

      return this.http.get(`${url}/login/renew`, {
        headers:{
      'x-token':token
    }
    })
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
        console.log(`el nuevo token seria ${resp.token}`);
      }),
      map(resp=>true),
      catchError(error=> of(false))  
    )
  }
    //registerForm es la interfaz
  crearUsuario (datos:RegisterForm){

      //al ser post, el segundo argumento es la data, esto comunicará con el backend y enviara los datos
      return this.http.post(`${url}/usuarios`, datos).pipe(
        tap((resp:any)=>{
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginUsuario(datos:LoginForm){

      return this.http.post(`${url}/login`, datos).pipe(
        tap((resp:any)=>{
          localStorage.setItem('token', resp.token)
        })
      )
      

  }

  loginGoogle(token: any){

    //Aqui cogemos el token de google y lo almacenamos
      return this.http.post(`${url}/login/google`, {token}).pipe(
        tap((resp:any)=>{
          console.log('Login de google');
          console.log(resp.token);
          localStorage.setItem('token', resp.token)
        })
      );
      

  }

    

}
