import { environment } from '../../environments/environment';

const url = environment.base_url;
//para la vinculacion con empresa/usuario
interface usuarioEmpresa{

    id:string;
    nombre:string;
    img:string

}

export class Empresa{

    constructor(
        public nombre:string,
        public img:string,
        public usuario:usuarioEmpresa,
        public _id:string

    ){}

    get imagenUrl(){

        if(!this.img){
            return `${url}/upload/usuario/hola.png`; 
        }else if(this.img!.includes('https')){
            return this.img;
        }else if(this.img){
            console.log(`desde el modelo  --${this.img}`);
            return `${url}/upload/empresas/${this.img}`;
        }else{
            return `${url}/upload/usuario/hola.png`;   
        }
        
    }

    

    
}