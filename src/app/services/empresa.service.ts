import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Empresa } from '../models/empresa.model';

const url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  

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

  //Para la pagina usuarios// para paginacion, ver usuario service
  cargarEmpresas(){
    const miUrl = `${url}/empresas`;
    return this.http.get<any>(miUrl,this.headers)
    .pipe(
      map( (resp: { 
        ok:boolean, empresas:Empresa[] }) => 
        resp.empresas
        
        )
    );
   }

   crearEmpresa(nombre:string){


    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/empresas`;
    return this.http.post(miUrl,{nombre}, this.headers);
    
   }

   updateEmpresa(nombre:string, _id:string){

    console.log(_id);
    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/empresas/${_id}`;
    //solo mandamos nombre pues solo cambiamos el nombre de la empresa
    return this.http.put(miUrl,{nombre}, this.headers);
    
   }

   borrarEmpresa(id:string){


    //Recordar post ( url, datos, headers)
    const miUrl = `${url}/empresas/${id}`;
    return this.http.delete(miUrl, this.headers);
    
   }

  
}
