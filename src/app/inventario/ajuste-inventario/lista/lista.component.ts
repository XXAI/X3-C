import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'ajuste-inventario-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {
  usuario;
  dato;
  modo = 'MC';
  lotes_insumo;
  cargando;
  insumo;
  es_unidosis;
  unidad_medida

  constructor(
    private crudService: CrudService){}

  ngOnInit() {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  /**
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * @param data json con los datos del objetop seleccionado del autocomplete
     * @return void
     */
  select_insumo_autocomplete(data) {

    var usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargando = true;
    //console.log(data);
    // cargar los datos de los lotes del insumo seleccionado en el autocomplete
    this.crudService.lista(0, 1000, 'comprobar-stock?almacen=' + usuario.almacen_activo.id + '&clave=' +
      data.clave_insumo_medico).subscribe(
      resultado => {

        let unidosis_temporal: Number;
        let normal_temporal: Number;

        this.lotes_insumo = resultado;
        //console.log(data.es_unidosis);
        this.es_unidosis = data.es_unidosis;
        this.unidad_medida = data.unidad_medida;

        let html = ``;
        if (data.es_causes === 1) {
          html += `<label class="tag is-success" ><strong>Causes </strong></label>`;
        }
        if (data.es_causes == 0)
          html += `<label class="tag" style="background: #B8FB7E; border-color: #B8FB7E; color: rgba(0,0,0,0.7);"><strong>No Causes </strong> </label>`; 
        if(data.es_unidosis == 1)                                                                 
          html += `<label class="tag is-warning" ><strong>Unidosis</strong></label>`;

        // poner el titulo a la modal
        document.getElementById('tituloModal').innerHTML = ` ${data.descripcion} <br>
          <p aling="justify" style="font-size:14px">${data.clave_insumo_medico}</p> 
          <p aling="justify" style="font-size:12px"> CANTIDAD POR ENVASE: 
          ${data.cantidad_x_envase ? data.cantidad_x_envase : 'Sin especificar' } </p>
          <br>
          ` + html;

        this.cargando = false;
        this.abrirModal('verLotes');
      },
      error => {
        this.cargando = false;
      }
    );
  }

  /**
     * Este método abre una modal
     * @param id identificador del elemento de la modal
     * @return void
     */
  abrirModal(id) {
    document.getElementById(id).classList.add('is-active');
  }

  /**
     * Este método cierra una modal
     * @param id identificador del elemento de la modal
     * @return void
     */
  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
  }
}