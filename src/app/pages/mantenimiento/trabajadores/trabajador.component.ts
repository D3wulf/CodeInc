import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Empresa } from 'src/app/models/empresa.model';

import { EmpresaService } from '../../../services/empresa.service';
import { TrabajadorService } from '../../../services/trabajador.service';
import { Trabajador } from '../../../models/trabajador.model';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styles: [
  ]
})
export class TrabajadorComponent implements OnInit {

  public trabajadorForm!: FormGroup;
  public empresas:Empresa[]= [];
      //TODO ARREGLAR ESO
  public empresaSeleccionada!:any;
      //cambiar la imagen del trabajador al cargal la pagina
  public trabajadorSeleccionado!:Trabajador;

  constructor( private fb: FormBuilder, 
              private empresaService:EmpresaService, 
              private trabajadorService:TrabajadorService,
              private router:Router,
              //cosa nueva coge datos de la ruta activa
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
      //coge datos de parametros
      //router.get('/:id', validarJWT, getTrabajadorId); el "id" debe ser el mismo
    this.activatedRoute.params.subscribe(({id})=>{
      //console.log(id);
    this.cargarTrabajador(id);

    })
    this.trabajadorForm = this.fb.group({
      nombre:['', Validators.required],
      empresa:['', Validators.required],
    });

    this.cargaEmpresas();
    //Si cambian los valores del select
    this.trabajadorForm.get('empresa')!.valueChanges
    .subscribe(empresaId=> {

      this.empresaSeleccionada = this.empresas.find(empresa =>empresa._id === empresaId)

      //console.log(this.empresaSeleccionada);
    })
  }
  //carga trabajador por id
  cargarTrabajador(id:string){

    if(id==='nuevo'){
      return;
    }

      this.trabajadorService.cargarTrabajadorId(id).pipe(
        delay(100)
      ).subscribe((trabajador:any)=>{
        
        if(!trabajador){
          return this.router.navigateByUrl(`/dashboard/trabajadores`)
        }else{
        const { nombre, empresa:{_id} } = trabajador;
        this.trabajadorSeleccionado = trabajador;
        //asignamos lo que devuelve a los input del formulario
         return this.trabajadorForm.setValue({nombre, empresa:_id});

        }
      })
  }

  //cargamos las empresas para mostrar en el select
  cargaEmpresas(){

    this.empresaService.cargarEmpresas().subscribe
    ((empresas:Empresa[])=>{

      this.empresas= empresas;
    })
  }

  guardar(){

    const {nombre} = this.trabajadorForm.value;

    if(this.trabajadorSeleccionado){
      const datosNecesarios = {
        ...this.trabajadorForm.value,
        _id:this.trabajadorSeleccionado._id
      }
      this.trabajadorService.updateTrabajador(datosNecesarios).subscribe(resp=>{
        //console.log(resp);
        Swal.fire('Actualizado',`${nombre}`,'success')
      })
      //actualiza
    }else{
      //crea

    
    this.trabajadorService.crearTrabajador(this.trabajadorForm.value).subscribe((resp:any)=>{

      //console.log(resp);
      Swal.fire('Guardado',`${nombre}`,'success')
      this.router.navigateByUrl(`/dashboard/trabajadores/${resp.trabajador._id}`)
    })

    }

    

  }

}
