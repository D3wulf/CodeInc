import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  //ESTO ES LO QUE MANDARIAMOS AL HIJO

  public titulo:string = "Actividad profesional (XD)";
  public labels:string[]= ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'];

  public data:object[] = [
    { data: [20, 30, 2, 0, 0, 0, 0], label: 'Curriculums Enviados', backgroundColor: '#11F775' },
    { data: [18, 25, 0, 0, 0, 0, 0], label: 'Curriculums Leidos' , backgroundColor: '#D40FB0' },
    { data: [17, 23, 0, 0, 0, 0, 0], label: 'Curriculums Rechazados', backgroundColor: '#EB791C' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Entrevistas', backgroundColor: '#7D00FA' }
  ];
  entrevista:number=0;

  delHijo(event:number){
    console.log(event)
  }


  

}
