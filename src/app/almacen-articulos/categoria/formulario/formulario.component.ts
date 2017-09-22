import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'categorias-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  form_categorias_metadatos;
  tipos;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],      
      categoria_id: ['']    ,
      nombre: ['', [Validators.required]],
      tiene_modulo:[''],
      categorias_metadatos: this.fb.array([])   
    });  
    this.form_categorias_metadatos = {
      campo:['', [Validators.required]], 
      descripcion: [''],  
      tipo:['', [Validators.required]], 
      longitud:[1, [Validators.required]], 
      requerido:[1],
      requerido_inventario:[0]
    }
    this.tipos = [
      {id: "text", nombre: "Texto"},
      {id: "number", nombre: "Número"},
      {id: "boolean", nombre: "Falso/Verdadero"},
      {id: "timestamp", nombre: "Fecha:hora"},
      {id: "date", nombre: "Fecha"},
      {id: "time", nombre: "Hora"},
      {id: "file", nombre: "File"}
    ]
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();  
  }
  
}