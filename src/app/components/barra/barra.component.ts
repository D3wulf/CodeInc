import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styles: [
  ]
})
export class BarraComponent{

  @Input() titulo:string= "Pruebas Título de Gráfica";

  //SI NO RECIBIMOS DEL PADRE, ENVIARIAMOS ESTOS DATOS 
  @Output () alPadre:EventEmitter<number> = new EventEmitter();

  //@Input('labels1') labels1:string[]= [];
  @Input('data1') barChartData: ChartDataSets[] = [
    { data: [20, 30, 2], label: 'Label1', backgroundColor: '#eeeeee' },
    { data: [18, 25, 0], label: 'Label2' , backgroundColor: '#000000' },
    { data: [17, 23, 0], label: 'Label3', backgroundColor: '#df7116' }
    
  ];
  @Input('labels2') barChartLabels: Label[] = ["Clases", "Cursos", "Youtube"];
  
  entrevistas:number= 0;

  addEntrevista(valor:number){

    console.log(valor);
    //console.log(this.data);
    
    
    this.alPadre.emit(valor);
    this.entrevistas= valor;
  }



  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  //public barChartLabels: Label[] = this.labels1;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  

  // public barChartData: ChartDataSets[] = [];


  constructor() { }
  // ngOnInit(): void {

  //   this.barChartLabels = this.labels1;
  //   this.barChartData = this.data;
    
  // }

  
  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40 ];

  //     //locuron! randomizamos la segunda barra

  //     this.barChartData[1].data = [
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100), ];

  //       this.barChartData[2].data = [
  //         Math.round(Math.random() * 100),
  //         Math.round(Math.random() * 100),
  //         Math.round(Math.random() * 100),
  //         (Math.random() * 100),
  //         Math.round(Math.random() * 100),
  //         (Math.random() * 100),
  //         Math.round(Math.random() * 100), ];

      
  //}

}
