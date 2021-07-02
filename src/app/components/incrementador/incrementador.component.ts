import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso:number= 50;
  @Input() cambioBtn:string ='btn-primary'
  // Ojo a la sintaxis del output
  @Output() valorAlPadre:EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number):void{

    if(this.progreso>=100 && valor>=0){
      this.valorAlPadre.emit(100);
      this.progreso=100;
      return;
    }

    if(this.progreso<=0 && valor<=0){
      this.valorAlPadre.emit(0);
      this.progreso=0;
      return;
    }

    this.progreso +=valor
    this.valorAlPadre.emit(this.progreso);
  }

  enElCambio(event:number){
    //Al hacer los cambios vemos que event nos emite un numero
    console.log(event);
    //Recordar, progreso es la barra de progreso :)
    if(event >=100){
      this.progreso=100;
    }else if (event<=0){
      this.progreso= 0
    }else{
      this.progreso= event;
    }
    this.valorAlPadre.emit(this.progreso);
    
  }


  constructor() { }

  ngOnInit()  {
    this.cambioBtn= `btn ${this.cambioBtn}`;
  }

  

}
