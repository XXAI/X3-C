import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, AfterViewInit } from '@angular/core';
import { Mensaje } from '../../mensaje';

@Component({
  selector: 'buscar-insumos',
  templateUrl: './buscar-insumos.component.html',
  styleUrls: ['./buscar-insumos.component.css'], 
  host: { '(document:keydown)' : 'keyboardInput($event)'}
})
export class BuscarInsumosComponent implements OnInit, AfterViewInit {
  
  @ViewChildren('searchBox') vc;
  
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEnviar = new EventEmitter<any>();



  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  mensajeAgregado: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION
  private insumoSeleccionado:any = {
        clave: "010.000.1327.00",
        tipo: "ME",
        generico: "CHUCHI",
        concentracion: "150mg/ml",
        presentacion: "SUSPENCIÓN",
        cantidad: null,
        causes: true,
        controlado: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat."
  };

  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() {            
        this.vc.first.nativeElement.focus();
  }

  cerrar(){
    this.onCerrar.emit();
  }

  enviar(){
    this.mensajeAgregado = new Mensaje(true, 2);
    this.mensajeAgregado.mostrar = true;    
    this.onEnviar.emit(this.insumoSeleccionado);
  }
  
  buscar(term: string): void {
    //this.terminosBusqueda.next(term);
  }

  keyboardInput(e: KeyboardEvent) {
    
    if(e.keyCode == 27 ){
      event.preventDefault();
      event.stopPropagation();
      this.cerrar();
    }
        
  }
}
