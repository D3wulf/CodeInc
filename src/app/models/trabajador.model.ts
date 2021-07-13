import { environment } from '../../environments/environment';
import { Empresa } from './empresa.model';

const url = environment.base_url;
//para la vinculacion con empresa/usuario
interface usuarioTrabajador{

    _id:string;
    nombre:string;
    img:string

}

export class Trabajador{

    constructor(
        public nombre:string,
        public _id:string,
        public img:string,
        public usuario?:usuarioTrabajador,
        public empresa?:Empresa
        

    ){}

    
}

