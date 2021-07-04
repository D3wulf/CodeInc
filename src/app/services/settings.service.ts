import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //ojo que el link href del head puede tener id!
  private enlaceTema = document.querySelector('#theme');
  enlaces: any;

  constructor() { 
    //al ser pocas lineas, no tenemos por que crear un metodo
    const url= localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

    this.enlaceTema?.setAttribute('href',url);
  }

  changeTheme(theme:string){
    const url= `./assets/css/colors/${theme}.css`;

    this.enlaceTema!.setAttribute('href',url);

    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    const enlaces= document.querySelectorAll('.selector');
 

    // Al tener muchos, los recorremos con un foreach

    enlaces.forEach(elem =>{

      //LO QUE VA A HACER FERNANDO ES HACER MATCH DE DIRECCIONES Y COLOCARLE EL CHECK

      //para remover una clase o parte de alguna clase

      elem.classList.remove('working');

      //ahora cogemos lo que sale en data-theme solo y lo metemos en una constante

      const btnTheme = elem.getAttribute('data-theme');

      //lo mismo de la linea 20
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      //El theme actual
      const currentTheme = this.enlaceTema!.getAttribute('href');

      if (btnThemeUrl=== currentTheme){
        elem.classList.add('working');
      }
    })

  }

}
