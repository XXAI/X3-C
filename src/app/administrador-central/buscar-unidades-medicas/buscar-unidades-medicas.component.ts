import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { BuscarUnidadesMedicasService } from "./buscar-unidades-medicas.service";

@Component({
  selector: 'administrador-central-buscar-unidades-medicas',
  templateUrl: './buscar-unidades-medicas.component.html',
  styleUrls: ['./buscar-unidades-medicas.component.css'],
  providers: [ BuscarUnidadesMedicasService ]
})
export class BuscarUnidadesMedicasComponent implements OnInit {

  @Input() ignorarClues:any[] = [];

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEnviar = new EventEmitter<any>();

  cargandoTiposUnidadMedica:boolean = false;
  cargandoJurisdicciones:boolean = false;
  cargando:boolean = false;

  seleccionarTodas:boolean = false;

  tiposUnidadMedica:any[] = [];
  jurisdicciones:any[] = [];

  tiposUnidadSeleccionados:any[] = [];
  jurisdiccionesSeleccionadas:any[] = [];
  clues: string = "";

  lista:any[] = [];

  constructor(private apiService:BuscarUnidadesMedicasService) { }

  ngOnInit() {
    this.cargarTiposUnidadMedica();
    this.cargarJurisdicciones();
  }

  buscar(){
    this.seleccionarTodas = false;
    this.lista = [];
    var tipos = [];
    for(var i in this.tiposUnidadSeleccionados){
      tipos.push(this.tiposUnidadSeleccionados[i].tipo);
    }

    var jurisdicciones = [];
    for(var i in this.jurisdiccionesSeleccionadas){
      jurisdicciones.push(this.jurisdiccionesSeleccionadas[i].id);
    }

    var payload = {
      clues: this.clues,
      tipos_unidad_medica: tipos,
      jurisdicciones: jurisdicciones
    }
    this.cargando = true;
    this.apiService.buscar(payload).subscribe(
      respuesta => {
        this.cargando = false;
        this.lista = respuesta;
        if(this.ignorarClues.length > 0){
          for(var i in this.lista){
            console.log(this.lista[i]);
            if(this.ignorarClues.indexOf(this.lista[i].clues) != -1){
              this.lista[i].disabled = true;
            }
          }
        }
        
      }, error => {
        this.cargando = false;
        console.log(error);
      }
    )
  }
  toggleSeleccionarTodas(){
    this.seleccionarTodas = !this.seleccionarTodas;

    for(var i in this.lista){
      if(!this.lista[i].disabled){
        this.lista[i].checked = this.seleccionarTodas;
      }      
    }
  }

  cargarTiposUnidadMedica(){
    this.cargandoTiposUnidadMedica = true;
    this.apiService.tiposUnidadMedica().subscribe(
      respuesta => {
        this.cargandoTiposUnidadMedica = false;
        this.tiposUnidadMedica = respuesta;
      }, error =>{
        this.cargandoTiposUnidadMedica = false;
        console.log(error);
      }
    )
  }

  cargarJurisdicciones(){
    this.cargandoJurisdicciones = true;
    this.apiService.jurisdicciones().subscribe(
      respuesta => {
        this.cargandoJurisdicciones = false;
        this.jurisdicciones = respuesta;
      }, error =>{
        this.cargandoJurisdicciones = false;
        console.log(error);
      }
    )
  }

  
	cambioSeleccionTipoUnidad(id){
		if (id == -1){
		  this.tiposUnidadSeleccionados = [];
		}
		this.agregarTipoUnidad(id);
	}

	cambioSeleccionJurisdiccion(id){
		if (id == -1){
		  this.jurisdiccionesSeleccionadas = [];
		}
		this.agregarJurisdiccion(id);
  }
  
  agregarTipoUnidad(tipo:any){
		if (tipo == -1){
		  return;
		}
		// Si existe en el filtro no la agregamos
		for(var i in this.tiposUnidadSeleccionados){
		  if(this.tiposUnidadSeleccionados[i].tipo == tipo){
			return;
		  }
		}
	
		for(var i in this.tiposUnidadMedica){
		  if(this.tiposUnidadMedica[i].tipo == tipo){
			this.tiposUnidadSeleccionados.push(this.tiposUnidadMedica[i]);
			break;
		  }
		}
  }
  agregarJurisdiccion(id:any){
		if (id == -1){
		  return;
		}
		// Si existe en el filtro no la agregamos
		for(var i in this.jurisdiccionesSeleccionadas){
		  if(this.jurisdiccionesSeleccionadas[i].id == id){
			return;
		  }
		}
	
		for(var i in this.jurisdicciones){
		  if(this.jurisdicciones[i].id == id){
			this.jurisdiccionesSeleccionadas.push(this.jurisdicciones[i]);
			break;
		  }
		}
	}
	
	quitarTipoUnidad(index){        
		this.tiposUnidadSeleccionados.splice(index,1);
	}
	
	quitarJurisdiccion(index){    
		this.jurisdiccionesSeleccionadas.splice(index,1);
  }
  
  agregar(){
    var unidades_medicas = [];

    for(var i in this.lista){
      if(this.lista[i].checked){
        unidades_medicas.push(this.lista[i]);
      }      
    }

    if(unidades_medicas.length > 0){
      this.onEnviar.emit(unidades_medicas);
    } else {
      alert("Debe elegir al menos 1 unidad médica");
    }

  }

  cerrar(){
    //this.searchBoxViewChildren.first.nativeElement.value = "";
    this.onCerrar.emit();
  }

}
