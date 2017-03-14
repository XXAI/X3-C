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


/*
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

*/

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

  // # SECCION: Resultados de filtro
  private filtroActivado:boolean = false;
  private listaInsumosFiltro:any[] = [];
  private listaInsumosFiltroPaginada:any[] = [];
  private paginaActualFiltro = 1;
  private resultadosPorPaginaFiltro = 5;
  private totalFiltro = 0;
  private paginasTotalesFiltro = 0;
  private indicePaginasFiltro:number[] = []

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
        clave: "010.000.0002.01",
        tipo: "ME",
        generico: "NAPROXENO",
        concentracion: "500mg",
        presentacion: "COMPRIMIDOS",
        cantidad: null,
        causes: true,
        controlado: true,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    this.listaInsumos.push(
      {
        clave: "010.000.0002.02",
        tipo: "ME",
        generico: "NAPROXENO",
        concentracion: "500mg",
        presentacion: "CAPSULAS",
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
    this.indexarLista();
    this.listar(1);
  }
  regresar(){
    
    this.location.back();
  }

  toggleModalInsumos(){
    this.mostrarModalInsumos = !this.mostrarModalInsumos
  }

  // # SECCION Pedido
  indexarLista(){
    var contador = 1;
    for(let i in this.listaInsumos){
      this.listaInsumos[i].lote = contador++;
    }

    this.paginasTotales = Math.ceil(this.listaInsumos.length / this.resultadosPorPagina);
    this.total = this.listaInsumos.length;

    this.indicePaginas = [];
    for(let i=0; i< this.paginasTotales; i++){
      this.indicePaginas.push(i+1);
    }
  }
  agregarItem(item:any = {}){
    let auxPaginasTotales = this.paginasTotales;
   
    this.listaInsumos.push(
      {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "CHUCHI",
        concentracion: "150mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: null,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
      }
    );
    
    this.indexarLista();

    // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
    if(this.listaInsumosPaginada.length == this.resultadosPorPagina 
      && this.paginaActual == auxPaginasTotales
      && !this.filtroActivado){
      this.listar(this.paginaActual + 1);
    } else{
      this.listar(this.paginaActual);
    }
  }
  eliminarItem(item:any, index:number){
    var contador: number = 0;
    for(let i in this.listaInsumos){
      if(this.listaInsumos[i] === item){
        this.listaInsumosPaginada.splice(index, 1);  
        this.listaInsumos.splice(contador, 1);  
        this.indexarLista();
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

    let inicio = (this.paginaActual - 1) * this.resultadosPorPagina;
    let fin = inicio + this.resultadosPorPagina;
    try {
      this.listaInsumosPaginada = this.listaInsumos.slice(inicio,fin);
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

  // # - Filtros 
  buscar(campos:string[],term:string){
    if(term != ""){
      this.filtroActivado = true;      
    } else {
      this.filtroActivado = false;
      this.listaInsumosFiltro = [];
      return;
    }

    this.listaInsumosFiltro = this.listaInsumos.filter((item)=> {   
      var cadena = "";
      for (let i in campos){
        cadena += " " + item[campos[i]].toLowerCase();
      }
      return cadena.includes(term.toLowerCase())
    });

    this.paginaActualFiltro = 1;
    this.listarFiltro(this.paginaActualFiltro);
  }

  listarFiltro(pagina: number){
    this.paginaActualFiltro = pagina;
    this.paginasTotalesFiltro = Math.ceil(this.listaInsumosFiltro.length / this.resultadosPorPaginaFiltro);
    this.totalFiltro = this.listaInsumosFiltro.length;

    this.indicePaginasFiltro = [];
    for(let i=0; i< this.paginasTotalesFiltro; i++){
      this.indicePaginasFiltro.push(i+1);
    }

    let inicio = (this.paginaActualFiltro - 1) * this.resultadosPorPaginaFiltro;
    let fin = inicio + this.resultadosPorPaginaFiltro;
    try {
      this.listaInsumosFiltroPaginada = this.listaInsumosFiltro.slice(inicio,fin);
    } catch(e){
      this.listaInsumosFiltroPaginada = [];
    }
    
  }
  paginaSiguienteFiltro():void {
    this.listarFiltro(this.paginaActualFiltro+1);
  }
  paginaAnteriorFiltro():void {
    this.listarFiltro(this.paginaActualFiltro-1);
  }
}
