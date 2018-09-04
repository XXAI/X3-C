import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ContratosService } from '../contratos.service';
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

import { environment } from '../../../../environments/environment';

import { Mensaje } from '../../../mensaje';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [ContratosService]
})
export class FormularioComponent implements OnInit {

  cargando: boolean = false;
  cargandoProveedores: boolean = false;
  guardando: boolean = false;
  esEditar: boolean = false;
  id: any;
  contrato: any = { precios:[] };
  errores = {}

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion: any;
  // # FIN SECCION

  tabInformacion:boolean = true;
  tabLista:boolean = false;

  // # SECCION: Catalogos

  proveedores: any[] = [];
  //lista:any[] = [];
  listaClavesAgregadas:any[] = [];

   // pager object
   pager: any = {};
 
   // paged items
   pagedItems: any[];


  // # SECCION: Cambios de Entorno
  cambiarEntornoSuscription: Subscription;
  // # FIN SECCION

  constructor(
    private title: Title,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private apiService: ContratosService,
    private cambiarEntornoService: CambiarEntornoService

  ) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.esEditar = true;
        this.title.setTitle('Editar contrato');

        this.cargar();

        if (params['lista']) {
          this.tabInformacion = false;
          this.tabLista = true;
        }
      } else {
        this.tabInformacion = true;
        this.tabLista = false;
        this.title.setTitle('Nuevo contrato');
      }
    });
    
    this.cargarProveedores();
  }


  cargar(){
    this.cargando = true;
    this.apiService.ver(this.id).subscribe(
      respuesta=>{
        this.contrato = respuesta;       

        /*
        if(this.insumo_medico.medicamento == null){
          this.insumo_medico.medicamento = {}
        }
        if(this.insumo_medico.material_curacion == null){
          this.insumo_medico.material_curacion = {}
        }*/

        for(var  i= 0; i< this.contrato.precios.length; i++){
          this.listaClavesAgregadas.push( this.contrato.precios[i].insumo_medico_clave);
        }
        this.setPage(1);
        this.cargando = false;
      }, error =>{
        console.log(error);
        this.cargando = false;
      }
    )
  }

  guardar() {
    this.guardando = true;

    var payload = this.contrato;

    


    this.errores = {}

    if (this.esEditar) {

      this.apiService.editar(this.id, payload).subscribe(
        respuesta => {
          console.log(respuesta);
          this.id = respuesta.id;

          /*
          if(this.insumo_medico.medicamento != null && this.insumo_medico.medicamento != {}){
            this.insumo_medico.medicamento.insumo_medico_clave = this.id;
          }

          if(this.insumo_medico.material_curacion != null && this.insumo_medico.material_curacion != {} ){
            this.insumo_medico.material_curacion.insumo_medico_clave = this.id;
          }*/
          this.guardando = false;
        },
        error => {
          this.guardando = false;
          try {
            let e = error.json();
            this.mensajeError = new Mensaje(true)
            switch (error.status) {
              case 401:
                this.mensajeError.texto = "No tiee permiso para realizar esta acción.";
                break;
              case 409:
                this.mensajeError.texto = "Verifique la información marcada de color rojo";
                for (var input in e.error) {
                  // Iteramos todos los errores
                  for (var i in e.error[input]) {
                    var object = input.split(".");
                  
                    if(object.length > 1){
       
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = {};
                      }
                      

                      this.errores[object[0]][object[1]] = e.error[input][i];

                    } else {
                      this.errores[input] = e.error[input][i];
                    }
                  }
                }
                break;
              case 500:
                this.mensajeError.texto = "500 (Error interno del servidor)";
                break;
              default:
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }
          } catch (e) {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
          this.mensajeError.mostrar = true;
        });
    } else {
      this.apiService.crear(payload).subscribe(
        respuesta => {
          this.guardando = false;
          this.router.navigate(['/administrador-central/contratos/editar/' + respuesta.id + "/lista"]);
        },
        error => {
          this.guardando = false;
          try {
            let e = error.json();
            this.mensajeError = new Mensaje(true)
            switch (error.status) {
              case 401:
                this.mensajeError.texto = "No tiee permiso para realizar esta acción.";
                break;
              case 409:
                this.mensajeError.texto = "Verifique la información marcada de color rojo";
                for (var input in e.error) {
                  // Iteramos todos los errores
                  for (var i in e.error[input]) {
                  
                    var object = input.split(".");
                  
                    if(object.length > 1){
       
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = {};
                      }
                      

                      this.errores[object[0]][object[1]] = e.error[input][i];

                    } else {
                      this.errores[input] = e.error[input][i];
                    }
                    
                  }
                }

                console.log(this.errores);
                break;
              case 500:
                this.mensajeError.texto = "500 (Error interno del servidor)";
                break;
              default:
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }
          } catch (e) {
            this.mensajeError.texto = "Hubo un error, al interpretar el ¿error?. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
          this.mensajeError.mostrar = true;

        });
    }
  }

  
  seleccionarProveedor(value) {
    this.contrato.proveedor_id = value;
  }

  cargarProveedores() {
    this.cargandoProveedores = true;

    this.apiService.proveedores().subscribe(
      respuesta => {
        this.proveedores = respuesta;
        this.cargandoProveedores = false;
      }, error => {
       
        this.proveedores = [];
        this.cargandoProveedores = false;
      }
    )
  }

  agregarItem(item: any = {}){
    //let auxPaginasTotales = this.pedido.paginacion.totalPaginas;

    this.contrato.precios.push({
      insumo_medico_clave: item.insumo.clave,
      insumo: item.insumo,
      precio: item.precio,
      tipo: item.tipo,
      tipo_insumo_id: item.tipo_insumo_id,
    });

    this.setPage(1);
  }

  eliminar(item: any, index): void {
		if (!confirm("¿Estás seguro de eliminar el insumo de la lista?")) {
			return;
    }


    var clave =  item.insumo_medico_clave;

    var indexLista = 0;
    
    for(var  i = 0; i < this.contrato.precios.length; i++){
      if(this.contrato.precios[i].insumo_medico_clave == clave){
        indexLista = i;
        break;
      }
    }


    this.contrato.precios.splice(indexLista, 1);

    var indexClavesAgregadas = 0;
    for(var  i = 0; i < this.listaClavesAgregadas.length; i++){
      if(this.listaClavesAgregadas[i] == clave){

        indexClavesAgregadas = i;
        break;
      }
    }
    this.listaClavesAgregadas.splice(indexClavesAgregadas, 1);
    this.setPage(this.currentPage);
  }
  currentPage: number = 1;
  setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this.contrato.precios.length, page);

    // get current page of items
    this.pagedItems = this.contrato.precios.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    this.currentPage = currentPage;
    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
     
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

  descargarFormato() {
		var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/formato-contrato-lista-precios-excel?${query}`);
  }

  opcionImportacion = "1";
  mensajeErrorSync: string = "";
  archivo: File = null;
	archivoSubido: boolean = false;
	enviandoDatos: boolean = false;
	progreso: number = 0;
  mostrarModalCarga:boolean =  false;
  erroresArchivo = {
		archivo: null
  }

  erroresImportacion:any[] = [];
  
  
	cambiarArchivo() {
		this.errores = { archivo: null }
		this.mensajeErrorSync = "";
		this.archivo = null;
		this.archivoSubido = false;
		this.enviandoDatos = false;
		this.progreso = 0;
	}
	cerrarModalCarga() {
		this.mostrarModalCarga = false;
		this.cambiarArchivo();
  }
  
  seleccionarOpcionImportacion(value) {
    this.opcionImportacion = value;
  }
	fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			this.archivo = fileList[0];
		}
  }
  
  subir() {
		if (this.archivo) {
			/*this.listaCargaMasiva = {
				medicamentos: { correctos: [], por_validar: [], errores: [] },
				material_curacion: { correctos: [], por_validar: [], errores: [] }
			}*/
			this.erroresArchivo = {
				archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;

			let usuario = JSON.parse(localStorage.getItem("usuario"));

			let formData: FormData = new FormData();
      formData.append('archivo', this.archivo, this.archivo.name);
      formData.append('contrato_id',this.id);
      formData.append('opcion_importacion',this.opcionImportacion);

			let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
			//let options = new RequestOptions({ headers: headers });


			var responseHeaders: any;
			var contentDisposition: any;
			this.http.post(`${environment.API_URL}/administrador-central/cargar-lista-precios-excel/`, formData, options)
				.subscribe(
					response => {
						this.archivoSubido = true;
						this.enviandoDatos = false;
						//this.mostrarModalSubirArchivoSQL = false;
						this.progreso = 100;
						this.archivo = null;


						var data = response.json().data;

            var listaSustituir:any[] = [];
            this.erroresImportacion = [];

						for (var i in data.precios) {
							if (data.precios[i].error != null) {
								this.erroresImportacion.push(data.precios[i]);
							} else {

                if(this.opcionImportacion != "1"){

                  var hayCoincidencia = false;
                  for(var j = 0; j < this.contrato.precios.length; j++){
                    if(this.contrato.precios[j].insumo_medico_clave == data.precios[i].insumo_medico_clave){
                      if(this.opcionImportacion == "2"){ //sustituir repetidos  de lo contrario ignoramos
                        
                        this.contrato.precios[j] = data.precios[i];
                      }

                      hayCoincidencia = true;
                      break;
                    }
                  }

                  if(!hayCoincidencia){
                    // Si no coincide simplemente agregamos
                    this.contrato.precios.push(data.precios[i]);
                  }
                } else {
                  listaSustituir.push(data.precios[i]);
                }
                
								
							}
            }
            if(this.opcionImportacion == "1" && listaSustituir.length > 0){
              this.contrato.precios = listaSustituir;
            }

            console.log(this.contrato.precios);

            if(this.erroresImportacion.length > 0 ){
              alert("Se ignoraron: " + this.erroresImportacion.length + " que contenian errores");
            }

            this.listaClavesAgregadas = [];
            for(var  z= 0; z< this.contrato.precios.length; z++){
              this.listaClavesAgregadas.push( this.contrato.precios[z].insumo_medico_clave);
            }

            console.log(this.listaClavesAgregadas);
            this.setPage(1);


            
            this.cerrarModalCarga();

					},
					error => {
						if (error.status == 409) {
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if (error.status == 401) {
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}
						this.progreso = 100;
						this.enviandoDatos = false;

					}
				);
		}
  }
  exportarExcel() {
		var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/exportar-contrato-lista-precios-excel/${this.id}/?${query}`);
  }
  

}
