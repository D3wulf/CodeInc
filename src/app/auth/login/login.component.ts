import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import Swal from 'sweetalert2'

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
    height: 100%; }`
  ]
})
export class LoginComponent implements OnInit {

  public formularioEnviado= false;
  public auth2:any;

  public formularioLogin = this.fb.group({
    
    email:[localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
    
    recordar:[false],
  });

  constructor( private router:Router,
    private fb:FormBuilder,
    private us:UsuarioServiceService,
    private ngZone:NgZone) { }
  

  login(){
    //this.router.navigateByUrl('/');

    //console.log(this.formularioLogin.value);

     if ( this.formularioLogin.get('recordar')!.value ) {
        
        localStorage.setItem('email', this.formularioLogin.get('email')!.value);

      }else{
        localStorage.removeItem('email');
      }



    // Realizar el posteo, enel servicio hacemos el post y al ser observable hay que suscribirse
    this.us.loginUsuario(this.formularioLogin.value).subscribe(resp=>{

    //console.log(resp);
    console.log('usuario logeado en component')
    this.router.navigateByUrl('/');
     },(err)=>{
      Swal.fire("Error", err.error.msg , 'error')
       
     });


  }
  // de la info de google
  onSuccess= (googleUser:any) =>{
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    let id_token = googleUser.getAuthResponse().id_token;
    //console.log(id_token);
  }

  onFailure = (error:any)=> {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });

    this.startApp();
  }
  ngOnInit(): void {
    this.renderButton()
  }
  //inicio de google sign in
  async startApp() {
    await this.us.googleInit();

    this.auth2 = this.us.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
  };

  attachSignin(element:any) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          //console.log(`attachSignin con ${id_token}`);
          this.us.loginGoogle( id_token ).subscribe(resp=>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');

            })
           
          });

          
        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
