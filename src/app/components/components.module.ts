import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { BarraComponent } from './barra/barra.component';
import { ChartsModule } from 'ng2-charts';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    BarraComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,FormsModule,
    ChartsModule
  ],
  exports:[
    IncrementadorComponent,BarraComponent,ModalComponent
  ]
})
export class ComponentsModule { }
