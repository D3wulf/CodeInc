import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trabajador } from '../models/trabajador.model';

const url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  public trabajador!:Trabajador;

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

  get uid():string{
    return this.trabajador._id || '';
  }

  //Para la pagina usuarios// para paginacion, ver usuario service
  cargarTrabajadores(){
    const miUrl = `${url}/trabajadores`;
    return this.http.get<any>(miUrl,this.headers)
    .pipe(
      map( (resp: { 
      ok:boolean, trabajador:Trabajador[] }) => 
      resp.trabajador
      
      )
      
    );
   
   }

   crearTrabajador(trabajador:Trabajador){


    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/trabajadores`;
    return this.http.post(miUrl,trabajador, this.headers);
    
   }

   updateTrabajador(trabajador:Trabajador){

    //console.log(trabajador._id);
    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/trabajadores/${trabajador._id}`;
    //solo mandamos nombre pues solo cambiamos el nombre de la empresa
    return this.http.put(miUrl,trabajador, this.headers);
    
   }

   borrarTrabajador(id:string){


    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/trabajadores/${id}`;
    return this.http.delete(miUrl, this.headers);
    
   }
}
