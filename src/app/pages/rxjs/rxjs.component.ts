import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, pipe, Subscription } from 'rxjs';
import { retry,take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  //guardaremos el valor del intervalo para poder quitar la suscripcion

  public intervaloGuardado: Subscription

  constructor() { 

    //conectamos un pipe para darle mas funciones, usamos retry de rxjs
    this.devuelveObservable().pipe(
      //el retry sin valor hara que pase la funcion del error y lo hara de forma infinita
      retry()
    )
    
    //Sin esto no funciona
    //Subscribe tiene 3 complementos, lo que devuelve, el error y cuando termina
    // .subscribe(
    //   //Devuelve
    //   valor => console.log("subs" , valor), 
    //   //error
    //   error => console.warn("error", error),
    //   //Cuando termina
    //   ()=> console.info('Observer terminado')

    // );

    //--------------- NOS SUSCRIBIMOS AL INTERVAL DE RXJS---------------//

    this.intervaloGuardado=  this.intervalDeRxjs().subscribe(valor=>{
      console.log(valor);
      
    })

    //----Simplificado lo de arriba .subscribe(console.log);

  }
  // Para cuando nos vayamos a otro lado, se quite la subscripcion
  ngOnDestroy(): void {
    this.intervaloGuardado.unsubscribe();
  }
  //Usamos interval de rxjs y usamos observable

  intervalDeRxjs():Observable<number>{
    // la $ es porque es observable
    return interval(1000)
      .pipe(

      //Take nos dice cuantas emisiones del observable se necesitan y complean el observable.
          take(10),
      //map coge la informacion y la muta como nosotros queramos, coge el valor de intervalo, valor = 1000
      //podemos retornar 4 holas mundos o lo que queramos, ha transformado un numero en un string
          map( valor=> valor + 1 ),
     //FIltro - predicado cogera el valor 1000 pasado por el map, cuidado que devuelve true o false, lo que es true lo pasa al filtro
          filter(valor => (valor % 2 == 0) ?  true : false),
      
          
      
      );
  }

  //----------- TENEMOS QUE INTERVAL DE RXJS HACE LO MISMO QUE LA FUNCION DEVUELVEOBSERVABLE CON MENOS CODIGO----------------//

  devuelveObservable():Observable<number>{

    //Hacemos esto para que devuelva un valor
    let i =-1;


    //Dicen que para crearlos hay que poner la $ al final
    //Como las promesas, tambien vana tener su cuerpo, sin nadie suscrito
    //el observable no funciona

    const observ$ = new Observable<number>( observer=>{
      

      //Esto seria para cancelar el intervalo, creariamos una constante, luego
      //usariamos el clearInterval, aunque a mi me funciono con el complete.

      //const intervalo = 
      setInterval(()=>{

        i++;
        //el next mandara el valor
        observer.next(i);

        //para cancelar o terminar el observer
        if(i === 4){
          //clearInterval(intervalo)
          observer.complete();
        }
        //forzamos el error para el subscribe
        if(i===2){
          observer.error('LLegamos a 2');
        }


        
      },1000)

    });

    return observ$;
      
  }

}
