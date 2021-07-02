import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { BarraComponent } from './barra/barra.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementadorComponent,
    BarraComponent
  ],
  imports: [
    CommonModule,FormsModule,
    ChartsModule
  ],
  exports:[
    IncrementadorComponent,BarraComponent
  ]
})
export class ComponentsModule { }
