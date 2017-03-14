import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location}           from '@angular/common';
//import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  cargando: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION



  // # SECCION: Resultados de búsqueda
  private ultimoTerminoBuscado = "";
  private terminosBusqueda = new Subject<string>();
  private resultadosBusqueda: string[] = [];
  private busquedaActivada:boolean = false;
  private paginaActualBusqueda = 1;
  private resultadosPorPaginaBusqueda = 5;
  private totalBusqueda = 0;
  private paginasTotalesBusqueda = 0;
  private indicePaginasBusqueda:number[] = []
  // # FIN SECCION



  // # SECCION: Modal Insumos
  private mostrarModalInsumos = false;
  // # FIN SECCION


  // # SECCION: Pedido
  private listaInsumos:any[] = [];
  private listaInsumosPaginada:any[] = [];
  private paginaActual = 1;
  private resultadosPorPagina = 5;
  private total = 0;
  private paginasTotales = 0;
  private indicePaginas:number[] = []
  // # FIN SECCION

  constructor(private title:Title, private location:Location) { }

  ngOnInit() {
    this.title.setTitle('Nuevo pedido / Farmacia');

    this.listaInsumos.push(
      {
        clave: "010.000.0001.00",
        tipo: "ME",
        generico: "PARACETAMOL",
        concentracion: "500mg",
        presentacion: "TABLETAS",
        cantidad: null,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );

    this.listaInsumos.push(
      {
        clave: "010.000.0002.00",
        tipo: "ME",
        generico: "NAPROXENO",
        concentracion: "150mg",
        presentacion: "COMPRIMIDOS",
        cantidad: null,
        causes: true,
        controlado: true,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1322.00",
        tipo: "ME",
        generico: "AMLODIPINO/VALSARTÁN/HIDROCLOROTIAZIDA",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: false,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1323.00",
        tipo: "ME",
        generico: "AMLODIPINO/VALSARTÁN/HIDROCLOROTIAZIDA",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: false,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1324.00",
        tipo: "ME",
        generico: "AMLODIPINO/VALSARTÁN/HIDROCLOROTIAZIDA",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: false,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1325.00",
        tipo: "ME",
        generico: "AMLODIPINO/VALSARTÁN/HIDROCLOROTIAZIDA",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: false,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1326.00",
        tipo: "ME",
        generico: "AMLODIPINO/VALSARTÁN/HIDROCLOROTIAZIDA",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: false,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );

    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "AMLODIPINO",
        concentracion: "150mg/ml 230mg/ml 0.3mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: 2,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listar(1);
  }
  regresar(){
    
    this.location.back();
  }

  toggleModalInsumos(){
    this.mostrarModalInsumos = !this.mostrarModalInsumos
  }

  // # SECCION Pedido

  eliminarItem(item:any, index:number){
    var contador: number = 0;
    for(let i in this.listaInsumos){
      if(this.listaInsumos[i] === item){
        this.listaInsumosPaginada.splice(index, 1);  
        this.listaInsumos.splice(contador, 1);  
        if(this.listaInsumosPaginada.length == 0){
          this.listar(this.paginaActual);
        }
        
        return;
      }
      
      contador++;
    }
    
  }

  // # SECCION: Paginación
  listar(pagina: number){
    this.paginaActual = pagina;
    this.paginasTotales = Math.ceil(this.listaInsumos.length / this.resultadosPorPagina);
    this.total = this.listaInsumos.length;

    this.indicePaginas = [];
    for(let i=0; i< this.paginasTotales; i++){
      this.indicePaginas.push(i+1);
    }

    let inicio = (this.paginaActual - 1) * this.resultadosPorPagina;
    let fin = inicio + this.resultadosPorPagina;
    try {
      this.listaInsumosPaginada = this.listaInsumos.slice(inicio,fin);

  
      var lote = inicio + 1;
      for( let item in this.listaInsumosPaginada ){
        console.log(item)
        this.listaInsumosPaginada[item].lote = lote;
        lote++;
      }
    } catch(e){
      this.listaInsumosPaginada = [];
    }
    
  }

  paginaSiguiente():void {
    this.listar(this.paginaActual+1);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1);
  }
}
