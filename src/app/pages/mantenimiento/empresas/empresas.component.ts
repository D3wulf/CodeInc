import { Component, OnInit, OnDestroy } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from '../../../services/empresa.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent implements OnInit, OnDestroy {

  public empresas:Empresa[]=[];
  public empresasTemp:Empresa[]=[];
  public cargando:boolean=true;
  public unsubImagen!:Subscription;
  

  constructor(private empresaService:EmpresaService, private modal:ModalService,
    private buscar:BusquedasService) { }
  ngOnDestroy(): void {
    this.unsubImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarEmpresa();

    this.unsubImagen = this.unsubImagen = this.modal.nuevaImgRecarga
    .pipe(delay(100))
    .subscribe(img=> this.cargarEmpresa());
    
    
    
  }

  cargarEmpresa(){
    this.cargando=true;
    this.empresaService.cargarEmpresas().subscribe(empresas=>{
    this.cargando = false;
    this.empresas = empresas;
    this.empresasTemp=empresas;
    
   

    
    })


  }
  // crearEmpresa(nombre:string){


  //   //Recordar post ( url, datos, headers)
  //   const miUrl = `${url}/empresas`;
  //   return this.http.post(miUrl,{nombre}, this.headers);
    
  //  }

   updateEmpresa(empresa:Empresa){
    
    this.empresaService.updateEmpresa(empresa.nombre,empresa._id).subscribe(resp=>{
      
      Swal.fire('Guardado', empresa.nombre, 'success');
    })
    
   }

  borrarEmpresa(empresa:Empresa){


    this.empresaService.borrarEmpresa(empresa._id).subscribe(resp=>{
      this.cargarEmpresa();
      Swal.fire('Borrado', empresa.nombre, 'success' )
    })
    
   }
   //crear empresa, botón!
   async abrirAlertaCreacion(){

    const { value='' } = await Swal.fire<string>({
        title:'Nueva Empresa',
        text:'Nombre de la nueva empresa',
        input: 'text',
        inputPlaceholder: 'Nombre de la empresa',
        showCancelButton: true,
      })
      
      if (value!.trim().length>0){

        this.empresaService.crearEmpresa(value!).subscribe(resp=>{

          Swal.fire('Guardado', value, 'success');
          this.cargarEmpresa();
        });
      }          
        }
        abrirModal(empresa:Empresa){


          // console.log(empresa.img);
          // console.log(`hola desde ${empresa.img}`)

          this.modal.abrirModal('empresas',empresa._id,empresa.img);
        }

        busqueda(termino:string){
    
          if(termino.length === 0){
      
            this.empresas= this.empresasTemp;
            return;
          }
      
          this.buscar.buscar('empresas', termino).subscribe((resp:any)=>{
      
            this.empresas = resp;
            })
        }

}
