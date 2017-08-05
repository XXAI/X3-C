import { Component, OnInit, NgZone, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, NgModel } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { NotificationsService } from 'angular2-notifications';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-salidas-estandar-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./../../../../../src/styles.css'],
  styles: ['ngui-auto-complete {z-index: 999999 !important}']
})

export class FormularioComponent {
  dato: FormGroup;
  form_insumos: any;
  tipo_ajuste = 1;
  ajuste= [];
  tab = 1;
  cant_solicitada_valida = false;
  unidad_medida;
  sum_cant_lotes = false;
  lista_de_lotes;
  insumo;
  es_unidosis = false;
  lotes_insumo= [];
  activar_vista_lotes = false;
  clave;
  // Crear la variable que mustra las notificaciones
  mensajeResponse: Mensaje = new Mensaje();

  tieneid = false;
  cargando = false;
  fecha_movimiento;
  mostrarCancelado;
  cantidad_x_envase;
  descripcion_insumo;

  // # SECCION: Reportes
  pdfworker: Worker;
  cargandoPdf = false;
  // # FIN SECCION

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  mostrar_lote = [];
  public insumos_term = `${environment.API_URL}/insumos-auto?term=:keyword`;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private notificacion: NotificationsService,
    private _ngZone: NgZone) { }



  ngOnInit() {

    // obtener los datos del usiario logueado almacen y clues
    let usuario = JSON.parse(localStorage.getItem('usuario'));

/*
    if (usuario.clues_activa) {
      this.insumos_term += '&clues=' + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += '&almacen=' + usuario.almacen_activo.id;
    }

*/
    // inicializar el formulario reactivo
    this.dato = this.fb.group({
      clave_insumo_medico: [''],
      lotes: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });
  }

  guardar_ajuste() {

    console.log(this.dato.value);
  }


  /**
     * Este método formatea los resultados de la busqueda en el autocomplte
     * @param data resultados de la busqueda
     * @return void
     */
  autocompleListFormatter = (data: any) => {
    let html = `
    <div class="card">
      <div class="card-content">
        <div class="media">          
          <div class="media-content">
            <p class="title is-4"> <small>${data.descripcion}</small></p>
            <p class="subtitle is-6">
              <strong>Clave: </strong> ${data.clave}) 
              `;

              if (data.es_causes == 1) {
                html += `<label class="tag is-success" ><strong>Cause </strong></label>`;
              }
              if (data.es_causes == 0) {
                html += `<label class="tag" style="background: #B8FB7E; border-color: #B8FB7E; 
                color: rgba(0,0,0,0.7);"><strong>No Cause </strong> </label>`;
              }
              if (data.es_unidosis == 1) {
                html += `<label class="tag is-warning" ><strong>Unidosis</strong></label>`;
              }

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

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargando = true;

    console.log(data);

    // cargar los datos de los lotes del insumo seleccionado en el autocomplete
    this.crudService.lista(0, 1000, 'comprobar-stock?almacen=' + usuario.almacen_activo.id + '&clave=' + data.clave).subscribe(
      resultado => {

        const control =  <FormArray>this.dato.controls.lotes;
        for (let item of resultado){
          console.log(item);
          item = {...item, ajuste: false, nueva_existencia: ''};
          control.controls.push(this.fb.group(item));
          console.log(item);
        }
        this.lotes_insumo = resultado;
        this.insumo = data;
        this.descripcion_insumo = this.insumo.descripcion;
        this.cantidad_x_envase = this.insumo.cantidad_x_envase;
        this.es_unidosis = data.es_unidosis;
        this.unidad_medida = data.unidad_medida;
        this.dato.patchValue({clave_insumo_medico: data.clave});
        this.clave = data.clave;

        // limpiar el autocomplete
        (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';

        this.cargando = false;
        this.activar_vista_lotes = true;
      },
      error => {
        this.cargando = false;
      }
    );
  }

  initLotes() {
      // initialize
      return this.fb.group({
          id: ['' + Math.floor(Math.random() * (999)) + 1],
          codigo_barras: [''],
          lote: [''],
          fecha_caducidad: [''],
          existencia: [''],
          ajuste: [true],
          nuevo: [1],
          nueva_existencia: ['']
      });
  }

  /**
     * Este método agrega una nueva fila para los lotes nuevos
     * @return void
     */
  agregarNuevoLote() {
    const control = <FormArray>this.dato.controls['lotes'];
    control.push(this.initLotes());
    console.log(this.dato.value);
  }

  /**
     * Este método chequea la opción de ajuste
     * @return void
     */
  check_option(event, i) {
    this.ajuste[i] = event.srcElement.checked;
    const control = <FormArray>this.dato.controls['lotes'];
    control.controls[i].value.ajuste =  event.srcElement.checked;
  }

  /**
     * Este método elimina los lotes nuevos que se agregaron a la lista de lotes
     * @return void
     */
  eliminarLote(index: number) {
    // this.lotes_insumo.splice(index, 1);
    const control = <FormArray>this.dato.controls['lotes'];
    control.removeAt(index);
  }

}
