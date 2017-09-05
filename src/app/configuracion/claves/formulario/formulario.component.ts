import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'almacenes-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  tipo='ME';
  es_causes=1;
  dato: FormGroup;
  cargando_claves_disponibles = false;
  actualizado;
  cargando = true;
  insumo;
  es_unidosis;
  error_actualizacion;
  actualizacion;
  actualizacion_usuario;
  tieneid;
  public insumos_term = `${environment.API_URL}/insumos-auto?term=:keyword`;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef  ) { }

  ngOnInit() {
    this.cargando_claves_disponibles = true;

    let usuario = JSON.parse(localStorage.getItem('usuario'));

    this.dato = this.fb.group({
      clues: [usuario.clues_activa.clues, [Validators.required]],
      jurisdiccion_id: [usuario.clues_activa.jurisdiccion_id],
      nombre: [usuario.clues_activa.nombre],
      activa: [usuario.clues_activa.activa],
      director_id: [usuario.clues_activa.director_id],
      clues_claves: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['clues']) {
        this.tieneid = true;
      }
    });

    if (usuario.clues_activa) {
      this.insumos_term += '&clues=' + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += '&almacen=' + usuario.almacen_activo.id;
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.cargarCatalogos();
    this.cargarValidar();
  }

  cargarCatalogos() {
    setTimeout( () => { document.getElementById('actualizar').click(); }, 7000);
  }

  cargarValidar() {
    this.cargando_claves_disponibles = true;
    setTimeout(() => {
      // obtener el formulario reactivo para agregar los elementos
      const control = <FormArray>this.dato.controls['clues_claves'];
      let c = 0, c1;
      let tempUpdateAt = '';
      let temp_usuario_id = '';

      // Solo si se tiene el control mover izquierda-derecha poner un 
      // <a id="initMover" (click)="ctrl.initMover(ctrl.dato.controls.almacen_tipos_movimientos.controls, ctrl.tipos_movimientos)>refresh</a>
      // incrementar el tiempo segun sea el caso para que cargue el catalogo en este caso va a acrgar 2 catalogos por eso pongo 5000
      if (control) {
        document.getElementById('catalogos').click();
        this.cargando_claves_disponibles = false;
      }
      // Comprobar si el arreglo no está vacío
      if (control.value.length !== 0) {
        // Comprobacion de la última fecha en la que se modificó y el usuario que lo hizo
        if (control.value[c].updated_at) {
          tempUpdateAt = control.value[c].updated_at;
          this.error_actualizacion = false;
        } else if (control.value[c].created_at) {
          tempUpdateAt = control.value[c].created_at;
          this.error_actualizacion = false;
        } else {
          this.error_actualizacion = true;
        }
        temp_usuario_id = control.value[c].usuario_id;
        for (c = 0; c < control.length; ) {
          if (control.value[c].updated_at > tempUpdateAt) {
            tempUpdateAt = control.value[c].updated_at;
            temp_usuario_id = control.value[c].usuario_id;
          }
          c = c + 1;
        }
        this.actualizacion = tempUpdateAt;
        this.actualizacion_usuario = temp_usuario_id;
        this.actualizado = true;
      }else {
        this.error_actualizacion = true;
        this.actualizacion_usuario = 'Sin actualización';
      }
    }, 10000);
  }

  /**
   * Este método formatea los resultados de la busqueda en el autocomplete
   * @param data resultados de la busqueda 
   * @return void
   */
  autocompleListFormatter = (data: any) => {
    let html = `
    <div class="card">
      <div class="card-content">
        <div class="media">          
          <div class="media-content">
            <p class="title is-4"> <!-- ${data.nombre} --> <small>${data.descripcion}</small></p>
            <p class="subtitle is-6">
              <strong>Clave: </strong> ${data.clave}) 
              `;
    
              if(data.es_causes == 1)
              html += `<label class="tag is-success" ><strong>Cause </strong></label>`;
              if(data.es_causes == 0)
              html += `<label class="tag" style="background: #B8FB7E; border-color: #B8FB7E; color: rgba(0,0,0,0.7);">
                <strong>No Cause </strong> </label>`; 
              if(data.es_unidosis == 1)                                                                 
              html += `<label class="tag is-warning" ><strong>Unidosis</strong> </label>`;
              
    html += `
            </p>
          </div>
        </div>
      </div>
    </div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * @param data json con los datos del objetop seleccionado del autocomplete
     * @return void
     */
  select_insumo_autocomplete(data) {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    this.cargando = true;
    this.insumo = data;
    this.agregarClave();
    (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';
    this.es_unidosis = data.es_unidosis;
    this.cargando = false;
  }

  /**
     * Este método agrega las claves de los insumos al formulario reactivo
     * @return void
     */
  agregarClave() {
    // obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['clues_claves'];

    // comprobar que el isumo no este en la lista cargada, si está en la lista no se agrega
    let existe = false;
    let c;

    for ( c = 0; c < control.length; c++) {
      if (this.insumo.clave === control.value[c].clave_insumo_medico) {
        existe = true;
      }
    }
    // crear el json que se pasara al formulario reactivo tipo insumos
    let temporal_cantidad_x_envase;
    if (this.insumo.cantidad_x_envase == null) {
      temporal_cantidad_x_envase = 1;
    }else {
      temporal_cantidad_x_envase = this.insumo.cantidad_x_envase;
    }
    let insumo = {
      'clave_insumo_medico': this.insumo.clave,
      'nombre': this.insumo.nombre,
      'descripcion': this.insumo.descripcion,
      'es_causes': this.insumo.es_causes,
      'es_unidosis': this.insumo.es_unidosis,
      'tipo': this.insumo.tipo,
      'codigo_barras': [''],
      'unidad_medida': [''],
      'cantidad_x_envase': parseInt(temporal_cantidad_x_envase),
    };

    // si no esta en la lista agregarlo
    if (!existe) {
      control.push(this.fb.group(insumo));
    }
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'almacenes-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent {
  tipo='ME';
  es_causes=1;
  actualizado=false;
  actualizacion;
  actualizacion_usuario;
  dato: FormGroup;
  cargando = false;
  insumo;
  es_unidosis = false;
  form_almacen_tipos_servicios: any;
  tieneid: boolean = false;

  public insumos_term: string = `${environment.API_URL}/insumos-auto?term=:keyword`;
  tab: number = 1;
  

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    
    this.dato = this.fb.group({
      clues: [usuario.clues_activa.clues],
      jurisdiccion_id:[usuario.clues_activa.jurisdiccion_id],
      nombre:[usuario.clues_activa.nombre],
      activa:[usuario.clues_activa.activa],
      director_id:[usuario.clues_activa.director_id],
      clues_claves: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['clues']) {
        this.tieneid = true;
      }
    });

    
    if (usuario.clues_activa) {
      this.insumos_term += "&clues=" + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += "&almacen=" + usuario.almacen_activo.id;
    }

    //obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['clues_claves'];

    //comprobar que el isumo no este en la lista cargada, si está en la lista no se agrega
    let c, c1;
    
    for(c=0; c < control.length; c++){
      for(c1=0; c1 < control.length; c1++){
        if(control.value[c].updated_at > control.value[c].updated_at)
          this.actualizacion=control.value[c].updated_at;
      }
    }

  }

  ngAfterViewInit() {
    //<a class="button" (click)="ctrl.cargarDatos();"  id="actualizar"></a>
    //Para poder cargar mis-claves
    document.getElementById("actualizar").click();
    setTimeout(() => {
    //obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['clues_claves'];
    let c=0, c1;
    let tempUpdateAt="";
    let temp_usuario_id="";

    //Comprobar si el arreglo no está vacío
    if(control.value.length != 0){
      //Comprobacion de la última fecha en la que se modificó y el usuario que lo hizo
      if(control.value[c].updated_at){
        tempUpdateAt =control.value[c].updated_at;
      }else{
        tempUpdateAt =control.value[c].created_at;
      }
      temp_usuario_id =control.value[c].usuario_id;
      for(c=0; c < control.length;){
        if(control.value[c].updated_at > tempUpdateAt){
          tempUpdateAt =control.value[c].updated_at;
          temp_usuario_id =control.value[c].usuario_id;
        }
        c=c+1;
      }
      this.actualizacion=tempUpdateAt;
      this.actualizacion_usuario=temp_usuario_id;
      this.actualizado = true;
    }else{
      this.actualizacion="Sin actualización";
      this.actualizacion_usuario="Sin actualización";
    }
      }, 4000);
  }
*/