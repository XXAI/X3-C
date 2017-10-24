import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'personal-clues-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  tab = 1;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
    this.dato = this.fb.group({
      id: [''],
      tipo_personal_id: ['', [Validators.required]],
      clues: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      usuario_asignado: [''],
      celular: [''],
      email: [''],
      surte_controlados: [''],
      licencia_controlados: [''],
      personal_clues_metadatos: this.fb.array([])
    });
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }
  valor = [];
  seleccionar_tipo_personal(tipos){
    var id = this.dato.get('tipo_personal_id').value;
    var campos = {};
    this.dato.controls.personal_clues_metadatos.reset();
    tipos.forEach(element => {
      if(element.id == id){        
        element.tipos_personal_metadatos.forEach(ele => {
          this.valor.push('');
          campos["metadatos_id"] = [ele.id];
          campos["campo"] = [ele.campo,[Validators.required]];
          campos["descripcion"] = [ele.descripcion];
          campos["longitud"] = [ele.longitud];
          campos["tipo"] = [ele.tipo];
          campos["requerido"] = [ele.requerido];
          
          if(ele.requerido == 1){            
            campos["valor"] = ['',[Validators.required]];
          }
          else{
            campos["valor"] = [''];
          }  
          const im = <FormArray>this.dato.controls.personal_clues_metadatos;  
          im.push(this.fb.group(campos));      
        });
        return;
      }
    });    
  }
  asignar_fecha(i){
    setTimeout(()=> {     
      var v = <HTMLInputElement>document.getElementById("valor"+i);
      
      const im = <FormArray>this.dato.controls.personal_clues_metadatos;  
      const ii = <FormGroup>im.controls[i];
      ii.controls.valor.patchValue(v.value);
    }, 300);    
  }
}