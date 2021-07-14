import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { Trabajador } from 'src/app/models/trabajador.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public usuarios:Usuario[]=[];
  public trabajadores:Trabajador[]=[];
  public empresas:Empresa[]=[];

  constructor(private activatedRoute:ActivatedRoute, private buscar:BusquedasService) { }

  ngOnInit(): void {
    //Cogemos los parámetros de la url
    this.activatedRoute.params.subscribe(({termino})=>{
     this.buscarEnHeader(termino);
    })
  }

  buscarEnHeader(termino:string){

    this.buscar.buscarEnHeader(termino).subscribe((resp:any)=>{
     this.empresas=resp.empresa;
     this.usuarios=resp.usuario;
     this.trabajadores= resp.trabajador;
    });

  }

  getTrabajador(trabajador:Trabajador){

    
  }

}
