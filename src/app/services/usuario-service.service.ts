import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';





const url= environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  auth2: any;

  public usuario!:Usuario;
 //fetch ---> javascript ES6     //angular--->httpclient--->observables


  constructor(private http:HttpClient,private router: Router,
    private ngZone: NgZone ) {this.googleInit();}

    get token():string{
      return localStorage.getItem('token') || '';
    }

    get uid():string{
      return this.usuario.uid || '';
    }

    get headers(){

      return {
        headers:{
          'x-token':this.token
        }
      }
    }

    get role():'ADMIN_ROLE' | 'USER_ROLE'{

      return this.usuario.role;
    }



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
        localStorage.removeItem('menu');

        //TODO:BORRAR MENU
        
        this.auth2.signOut().then( ()=> {
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/login');
          })
          
        });
    }
    //QUeremos coger el token de google y tranformarlo en uno nuestro
    validarToken():Observable<boolean>{

      console.log(`primero token= ${this.token}`)
      return this.http.get(`${url}/login/renew`, {
        headers:{
      'x-token':this.token
    }
    })
    .pipe(
      map((resp:any)=>{
        //console.log(`segundo token= ${resp.token}`);
        const {email,google, nombre, role, uid, img=''} = resp.usuario;
        //cuidado el orden
        this.usuario = new Usuario(nombre,email,'',img ,google,role,uid);
        //grabaciones localStorage
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));

        console.log(`el nuevo token seria ${resp.token}`);

        return true;
      }),
      //map(resp=>true),
      catchError(error=> of(false))  
    )
  }
    //registerForm es la interfaz
  crearUsuario (datos:RegisterForm){

      //al ser post, el segundo argumento es la data, esto comunicar?? con el backend y enviara los datos
      return this.http.post(`${url}/usuarios`, datos).pipe(
        tap((resp:any)=>{
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      )
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string}){

    data={
      ...data,role:this.usuario.role
    }
    

    return this.http.put(`${url}/usuarios/${this.uid}`,data, this.headers);
  }

  loginUsuario(datos:LoginForm){

      return this.http.post(`${url}/login`, datos).pipe(
        tap((resp:any)=>{
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));

        })
      )
      

  }

  loginGoogle(token: any){

    //Aqui cogemos el token de google y lo almacenamos
      return this.http.post(`${url}/login/google`, {token}).pipe(
        tap((resp:any)=>{
          console.log('Login de google');
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      );
      

  }

  //Para la pagina usuarios
   cargarUsuarios( desde:number=0){
    const miUrl = `${url}/usuarios?desde=${desde}`;
    return this.http.get<{totalRegistros:number, usuarios:Usuario[]}>(miUrl,this.headers)
    //TODO ESTO PARA CARGAR LAS IMAGENES DE LOS USUARIOS EN LA TABLA...
    .pipe(
      map( resp => {
        const usuarios = resp.usuarios.map(
          user =>new Usuario(user.nombre, user.email,'',user.img, user.google,user.role,user.uid));
        return{
          totalRegistros: resp.totalRegistros,
          usuarios

        }
      })
      

    )
   }

    eliminarUsuario(usuario:Usuario){
      const miUrl = `${url}/usuarios/${usuario.uid}`;
      return this.http.delete(miUrl,this.headers);
      


    }
    //cambiar role en la page usuarios
    cambioRole(usuario:Usuario){

    

      return this.http.put(`${url}/usuarios/${usuario.uid}`,usuario, this.headers);
    }

}
