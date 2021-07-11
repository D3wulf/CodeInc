import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;

  public usuario: Usuario;

  public ImagenSubir!:File;

  public imagenParaSubir:any;




  constructor(private fb:FormBuilder, private us:UsuarioServiceService, private ups:FileUploadService) {

    this.usuario = this.us.usuario;
   }
   

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],
      
    });
  }

  actualizarPerfil(){

    this.us.actualizarPerfil(this.perfilForm.value).subscribe(() =>{
      const {nombre, email }= this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Actualizado correctamente', 'success')
    },(error)=>{

      Swal.fire('Error', error.error.msg,'error')
    })
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

    this.ups
    .actualizarFoto(this.ImagenSubir,'usuarios', this.usuario.uid!)
    .then(img => {
    this.usuario.img=img;
    Swal.fire('Guardado', 'Actualizado correctamente', 'success');
    }).catch(err=>{
      console.log(err);
      Swal.fire('Error', err.error.msg,'error');
    })
    
    
  }

}
