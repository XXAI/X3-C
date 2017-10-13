import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programa-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  /**
   * Contiene __true__ cuando el formulario recibe el parámetro id, lo que significa que ha de mostrarse una salida por receta
   * existente. Cuando su valor es __false__ quiere decir que mostraremos la vista para crear una nueva salida.
   * @type {Boolean} */
  tieneid = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      clave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      status: [0, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });
  }
}
