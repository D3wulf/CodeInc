import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    })

    //las promesas requieren de un cuerpo, callback/funcion, el resolve/reject
    //Las promesas van con .then .catch y .finally

    // const promesa = new Promise( (res, reject)=>{

    //   if(false){
    //     res("hola mundo");
    //   }else{
    //     reject('hola desde reject');
    //   }
      
      

    // });

    // //Cuando se hace todo correcto, usamos el then.
    // //Como ha ido bien,  recibimos un mensaje que sera lo que tengamos en el resolve,porque es lo que resuelve la promesa
    // //o sea que la promesa en si no devuelve nada si no es con el then 
    // //En este caso hemos puesto mensaje pero puede ser otra cosa



    // promesa.then( (mensaje)=> {

    //   console.log(mensaje);

    // })

    // .catch(error => console.log("error en la promesa", error))

    // console.log('fin del init');



  }

  //---------PROMESAS EN ANGULAR--------------//
  //---------mediante fetch-----------------//

  getUsuarios(){

    const promesa = new Promise( res=>{

      fetch(`https://reqres.in/api/users?page=2`).then( resp=> {

        //console.log(resp);
        //Aqui lo pasamos a json para acceder mejor a los datos y se genera
        //otra promesa, ahi metemos el resolve
        resp.json().then( otraResp=>{

          res(otraResp.data);
        
        });

      })


    })

    return promesa;

    
  }



  

}
