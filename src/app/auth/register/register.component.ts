import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  /*
Template Name: Admin pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: scss
*/
/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: scss
*/
/*Theme Colors*/
/*bootstrap Color*/
/*Light colors*/
/*Normal Color*/
/*Extra Variable*/
/*******************
Login register and recover password Page
******************/
.login-register {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  width: 100%;
  padding: 10% 0;
  position: fixed; }

.login-box {
  width: 400px;
  margin: 0 auto; }
  .login-box .footer {
    width: 100%;
    left: 0px;
    right: 0px; }
  .login-box .social {
    display: block;
    margin-bottom: 30px; }

#recoverform {
  display: none; }

.login-sidebar {
  padding: 0px;
  margin-top: 0px; }
  .login-sidebar .login-box {
    right: 0px;
    position: absolute;
    height: 100%; }
`
  ]
})
export class RegisterComponent {

  public formularioEnviado= false;

  public formularioRegistro = this.fb.group({
    nombre:['Pepe',[Validators.required, Validators.minLength(3)]],
    email:['m@m.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required]],
    password2:['123456',[Validators.required]],
    terminos:[ true ,[Validators.required]],
  },{
    validators:this.passwordsIguales('password','password2')
  });

  constructor(private fb:FormBuilder, private us:UsuarioServiceService,private router:Router) { }


  

  crearUsuario(){
    this.formularioEnviado=true;
    console.log(this.formularioRegistro.value);

     if ( this.formularioRegistro.invalid ) {
        return;
        }
        // Realizar el posteo, enel servicio hacemos el post y al ser observable hay que suscribirse
    this.us.crearUsuario(this.formularioRegistro.value).subscribe(resp=>{

    console.log(resp);
    console.log('usuario creado en component')
    this.router.navigateByUrl('/');
     },(err)=>{
      Swal.fire("Error", err.error.msg , 'error')
       
     });
     
  }

  campoNoValido(campo:string):boolean{

    if (this.formularioRegistro.get(campo)!.invalid && this.formularioEnviado){
      return true;
    }else{
      return false;
    }


  }

  aceptaTerminos(){
    
    return !this.formularioRegistro.get('terminos')!.value && this.formularioEnviado;
    
  }
  //para que salga el mensaje de error de que no coinciden
  passwordMatch(){
    const pass1 = this.formularioRegistro.get('password')!.value
    const pass2 = this.formularioRegistro.get('password2')!.value

    if(pass1 === pass2){
      return false;
    }else{
      return true;
    }
  }


  passwordsIguales(pass1:string, pass2:string){

    return( formGroup:FormGroup)=> {

      const  pass1Control = formGroup.get(pass1);
      const  pass2Control = formGroup.get(pass2);
      if(pass1Control!.value===pass2Control!.value){

        pass2Control!.setErrors(null);
      }else{
        pass2Control!.setErrors({noEsIgual:true});
      }
    }

  }

  

}
