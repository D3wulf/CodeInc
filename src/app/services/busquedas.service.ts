import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){

    return {
      headers:{
        'x-token':this.token
      }
    }
  }
//para que en la busqueda aparezan las imágenes
  private generarUsuarios(resultado:any[]):Usuario[]{

    return resultado.map(
    user =>new Usuario(user.nombre, user.email,'',user.img, user.google,user.role,user.uid));
    
  }

  buscar(tipo:'usuarios'|'trabajadores'|'empresas',termino:string){
    
    const miUrl = `${url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(miUrl,this.headers)
    .pipe(
      map( (resp:any) => {
          //console.log(resp);
          switch (tipo) {
            case 'usuarios':
              return this.generarUsuarios(resp.usuario)
              
          
            default:
              return[];
          }
        }));
      }
      

  
}
