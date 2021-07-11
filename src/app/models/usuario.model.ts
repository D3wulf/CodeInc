import { environment } from '../../environments/environment';

const url = environment.base_url;

export class Usuario{

    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public img?:string,
        public google?: boolean,
        public role?:string,
        public uid?:string


    ){}

    get imagenUrl(){

        if(this.img!.includes('https')){

            return this.img;
        }
        if(this.img){

            return `${url}/upload/usuarios/${this.img}`;
        }else{
            return `${url}/upload/hola.png`;   
        }
        
    }
}