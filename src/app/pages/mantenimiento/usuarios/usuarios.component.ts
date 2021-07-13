import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUser:number=0;
  public usuariosBD:Usuario[]= [];
  //esto es para cuando borremos la busqueda, no haya resultados
  public usuariosTemp:Usuario[]= [];
  public paginaDesde:number=0;
  //carga info
  public cargando:boolean=true;

  public unsubImagen!:Subscription;

  constructor(private us:UsuarioServiceService,
    private buscar:BusquedasService, private modal:ModalService) {

    
   }
  ngOnDestroy(): void {
    this.unsubImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.unsubImagen = this.modal.nuevaImgRecarga.pipe(
      delay(100)
    ).subscribe(img=>{

      this.cargarUsuarios();
    })
  }

  //cargara usuarios

  cargarUsuarios(){
    this.cargando = true;
    this.us.cargarUsuarios(this.paginaDesde)
    .subscribe(({totalRegistros,usuarios})=>{
      this.totalUser=totalRegistros;
      this.usuariosBD=usuarios;
      this.usuariosTemp=usuarios;
      this.cargando=false;
      
    })


  }

  //paginacion
  cambiarPagina(valor:number){

    this.paginaDesde+=valor;

    if(this.paginaDesde<0){
      this.paginaDesde=0;
    }else if (this.paginaDesde>=this.totalUser){

      this.paginaDesde-=valor;
    }
     this.cargarUsuarios();


  }

  busqueda(termino:string){
    
    if(termino.length === 0){

      this.usuariosBD= this.usuariosTemp;
      return;
    }

    this.buscar.buscar('usuarios', termino).subscribe((resp:any)=>{

      this.usuariosBD = resp;
      })
  }
  eliminarUsuario(usuario:Usuario){

    if(usuario.uid === this.us.uid){
     Swal.fire('Error', 'No puedes borrarte','error');
     return;
    }

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

            this.us.eliminarUsuario(usuario).subscribe(resp=>
              {
              swalWithBootstrapButtons.fire(
                'Usuario Borrado', 
                `${usuario.nombre} ha sido eliminado`, 
                'success');
                this.cargarUsuarios();
              }
            )
          }    
      } 
    })
    
  }
  // Coge el item. role, lo envia y lo pasa por el servicio?!
  cambiarRole(usuario:Usuario){

    this.us.cambioRole(usuario).subscribe(resp=>{


    })

  }
  abrirModal(user:Usuario){
    //console.log(user);
    this.modal.abrirModal('usuarios',user.uid,user.img);
  }
}
