import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Empresa } from '../models/empresa.model';
import { Trabajador } from '../models/trabajador.model';


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


  private generarEmpresas(resultado:any[]):Empresa[]{

    return resultado;
    
  }
  private generarTrabajadores(resultado:any[]):Trabajador[]{

    return resultado;
    
  }

  buscar(tipo:'usuarios'|'trabajadores'|'empresas',termino:string){
    //console.log(tipo,termino);
    const miUrl = `${url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(miUrl,this.headers)
    .pipe(
      map( (resp:any) => {
          //console.log(resp);
          switch (tipo) {
            case 'usuarios':
              return this.generarUsuarios(resp.usuario);
             
            case 'empresas':
              return this.generarEmpresas(resp.empresa);
             
            case 'trabajadores':
              //console.log(resp);
              return this.generarTrabajadores(resp.trabajador);
              
              
          
            default:
              return[];
          }
        }));
      }
      
      //busquedas generales web
    buscarEnHeader( termino:string){


      const miUrl = `${url}/todo/${termino}`;
      return this.http.get<any[]>(miUrl,this.headers);
    }
  
}
