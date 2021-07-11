import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {



  constructor() { }

  async actualizarFoto( 
    archivo:File,
    tipo:'usuarios'|'empresas'|'trabajadores', 
    id:string
    ){



    try{

      const urlFoto = `${url}/upload/${tipo}/${id}`;

      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch( urlFoto, {
        method:'PUT', 
        headers: {'x-token': localStorage.getItem('token')||''},
        body:formData
      });

      

      const data = await resp.json();
      console.log(data);

      if(data.ok){
        return data.img;
      }else{
        console.log(data.msg);
        return false;
      }

      

      //console.log(resp);
        return 'Nombre de la imagen';
        
    }catch (error){

      console.log(error);
      return false;


    }
  }
}
