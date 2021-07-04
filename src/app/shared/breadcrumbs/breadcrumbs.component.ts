import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo:string=''; 

  public tituloSubs$:Subscription;

  //Aqui queremos coger de las rutas la data que hemos puesto, por eso
  //cogemos el router. dentro del router estan los events y de ahi sacaremos 
  //toda la info para extraer la data


  constructor(private router:Router) {
    //Aquí vamos a crear una suscripcion para poder usar el unsubscribe, la variable que 
    //hara el unsubscribe la asignamos al metodo getArgumentos, como este metodo tiene los filtros
    //y el map, solo nos falta la suscripcion y la data


     //despues de los filtros y el map, nos queda la data que es donde tenemos el titulo
    this.tituloSubs$ =  this.getArgumentosRuta().subscribe(data =>{

      this.titulo= data.titulo;
      document.title= `CodeInc - ${data.titulo}`;
      console.log(data);
    });
   }
  ngOnDestroy(): void {

    this.tituloSubs$.unsubscribe();
  }

   getArgumentosRuta(){
   //events es un observable
   return this.router.events
   .pipe(
     // Filtraremos si el evento es del tipo activationend. Activationend es parte del evento
     //lo sacamos del cons-log event
     filter(event => event instanceof ActivationEnd),
     filter( (event:any) => event.snapshot.firstChild === null),
     //despues del segundo filtro nos queda el evento que queremos y extraemos la data
     map((event:ActivationEnd) => event.snapshot.data)
     //Quedan dos activationend y queremos el que tenga firstChild: null
   )
    
   
  }

  ngOnInit(): void {
  }

}
