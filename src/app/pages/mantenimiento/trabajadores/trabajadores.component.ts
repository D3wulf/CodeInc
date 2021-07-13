import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
import { TrabajadorService } from '../../../services/trabajador.service';
import { Trabajador } from '../../../models/trabajador.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styles: [
  ]
})
export class TrabajadoresComponent implements OnInit,OnDestroy {

  public trabajadores:Trabajador[]=[];
  public trabajadorTemp:Trabajador[]=[];
  public cargando:boolean=true;
  public unsubImagen!:Subscription;
  

  constructor(private curranteService:TrabajadorService, private modal:ModalService,
    private buscar:BusquedasService) { }


  ngOnDestroy(): void {

    this.unsubImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarTrabajador();
    
    this.unsubImagen = this.unsubImagen = this.modal.nuevaImgRecarga
    .pipe(delay(100))
    .subscribe(img=> this.cargarTrabajador());
    
  }

  cargarTrabajador(){
    this.cargando=true;
    this.curranteService.cargarTrabajadores().subscribe(trabajador=>{
    this.cargando = false;
    
    this.trabajadores = trabajador;
    this.trabajadorTemp = trabajador;
    //console.log(trabajador);
    
   

    
    })


  }

  abrirModal(trabajador:Trabajador){

    this.modal.abrirModal('trabajadores',trabajador._id,trabajador.img);
    
  }
  // crearTrabajador(nombre:string){


  //   //Recordar post ( url, datos, headers)
  //   const miUrl = `${url}/trabajadores`;
  //   return this.http.post(miUrl,{nombre}, this.headers);
    
  //  }

  //  updateEmpresa(empresa:Empresa){
    
  //   this.empresaService.updateEmpresa(empresa.nombre,empresa._id).subscribe(resp=>{
      
  //     Swal.fire('Guardado', empresa.nombre, 'success');
  //   })
    
  //  }

  borrarTrabajador(trabajador:Trabajador){

     const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
       buttonsStyling: false
     })
     
     swalWithBootstrapButtons.fire({
       title: '¿Está seguro?',
       text: "Los cambios serán permanentes",
       icon: 'question',
       showCancelButton: true,
       confirmButtonText: 'Si, borrar',
       cancelButtonText: 'No, cancelar',
       reverseButtons: true
     })
     .then((result) => {
       if (result.isConfirmed) {
           if(result.value){
 
             this.curranteService.borrarTrabajador(trabajador._id).subscribe(resp=>
               {
               swalWithBootstrapButtons.fire(
                 'Trabajador Borrado', 
                 `${trabajador.nombre} ha sido eliminado`, 
                 'success');
                 this.cargarTrabajador();
               }
             )
           }    
       } 
     })
     
    
   }
  //crear empresa, botón!
  // async abrirAlertaCreacion(){

  //   const { value='' } = await Swal.fire<string>({
  //       title:'Nueva Empresa',
  //       text:'Nombre de la nueva empresa',
  //       input: 'text',
  //       inputPlaceholder: 'Nombre de la empresa',
  //       showCancelButton: true,
  //     })
      
  //     if (value!.trim().length>0){

  //       this.curranteService.crearEmpresa(value!).subscribe(resp=>{

  //         Swal.fire('Guardado', value, 'success');
  //         this.cargarEmpresa();
  //       });
  //     }          
  //       }
  

        busqueda(termino:string){

          if(termino.length === 0){
      
            //this.trabajadores= this.trabajadorTemp;
            return this.cargarTrabajador();
          }
      
          this.buscar.buscar('trabajadores', termino).subscribe((resp:any)=>{
            //console.log(resp);
            this.trabajadores = resp;
            })
        }

}
