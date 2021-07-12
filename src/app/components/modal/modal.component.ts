import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { UsuarioServiceService } from '../../services/usuario-service.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public ImagenSubir!:File;

  public imagenParaSubir:any;

  public usuario!: Usuario;


  constructor(public modal:ModalService, private ups:FileUploadService, private us:UsuarioServiceService) {
    
   }

  ngOnInit(): void {
  }

  cerrarModal(){
    //para que cuando abrimos el modal y cancelemos, no salga imagen al volver a darle
    this.imagenParaSubir=null;
    this.modal.cerrarModal();
  }

  cambiarImagen(event:any):void{

    if(!event.target.files[0]){
      return;
    }
    //ESTO SE HACE PARA QUE CUANDO SE CAMBIE LA IMAGEN NO HAGA FALTA RECARGAR
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend =  ()=>{
      this.imagenParaSubir= reader.result;
      console.log(reader.result);

    }

    try{

      this.ImagenSubir = event.target.files[0];
      

    }catch(error){

      console.log(error);
      
    }

    
    
    
  }
  subirImagen(){

    const id= this.modal.id

    this.ups
    .actualizarFoto(this.ImagenSubir,'usuarios', id)
    .then(img => {
    
    Swal.fire('Guardado', 'Actualizado correctamente', 'success');

    this.modal.nuevaImgRecarga.emit(img);
      
    this.cerrarModal();
    
    })
    
    .catch(err=>{
      console.log(err);
      Swal.fire('Error', err.error.msg,'error');
    })
    
    
  }
  

}
