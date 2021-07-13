import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public _ocultarModal:boolean=true;
  public tipo!:'usuarios'|'empresas'|'trabajadores';
  public id!:string;
  public img!:string;

  //todo esto para recargar la pagina y que se hagan efectivos los cambios...
  public nuevaImgRecarga:  EventEmitter<string> = new EventEmitter<string>();


  get ocultarModal(){

    return this._ocultarModal;
  }

  abrirModal(tipo:'usuarios'|'empresas'|'trabajadores',id:string, img:string='no-img')
    {
    this.tipo=tipo;
    this.id=id;
    
    if(img.includes('https')){

      this.img= img;
    }else {

      
      this.img= `${url}/upload/${tipo}/${img}`;
    }
    
    
    this._ocultarModal=false;
  }

  cerrarModal(){

    this._ocultarModal=true;
  }

  constructor() { }
}
