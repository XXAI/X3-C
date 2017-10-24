import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programa-formulario',
  templateUrl: './formulario.component.html',
  styles: [`
    .b-checkbox {
      line-height: 1;
    }
    .select{
      width: 100%;
    }
    .b-checkbox label {
      position: relative;
      padding-left: 5px;
      cursor: pointer;
    }

    .b-checkbox label::before {
      content: "";
      position: absolute;
      width: 17px;
      height: 17px;
      left: 0;
      margin-left: -17px;
      border: 1px solid #dbdbdb;
      border-radius: 3px;
      background-color: #fff;
      transition: background .1s ease-in-out;
    }

    .b-checkbox label::after {
      position: absolute;
      width: 16px;
      height: 16px;
      left: 0;
      top: 5px;
      margin-left: -15px;
      font-size: 12px;
      line-height: 1;
      color: #363636;
    }

    .b-checkbox input[type="checkbox"],
    .b-checkbox input[type="radio"] {
      opacity: 0;
      z-index: 1;
      cursor: pointer;
    }

    .b-checkbox input[type="checkbox"]:focus + label::before,
    .b-checkbox input[type="radio"]:focus + label::before {
      outline: thin dotted;
      outline: 5px auto -webkit-focus-ring-color;
      outline-offset: -2px;
    }

    .b-checkbox input[type="checkbox"]:checked + label::after,
    .b-checkbox input[type="radio"]:checked + label::after {
      font-family: "FontAwesome";
      content: "";
    }

    .b-checkbox input[type="checkbox"]:indeterminate + label::after,
    .b-checkbox input[type="radio"]:indeterminate + label::after {
      display: block;
      content: "";
      width: 10px;
      height: 3px;
      background-color: #555555;
      border-radius: 2px;
      margin-left: -16.5px;
      margin-top: 7px;
    }

    .b-checkbox input[type="checkbox"]:disabled,
    .b-checkbox input[type="radio"]:disabled {
      cursor: not-allowed;
    }

    .b-checkbox input[type="checkbox"]:disabled + label,
    .b-checkbox input[type="radio"]:disabled + label {
      opacity: 0.65;
    }

    .b-checkbox input[type="checkbox"]:disabled + label::before,
    .b-checkbox input[type="radio"]:disabled + label::before {
      background-color: whitesmoke;
      cursor: not-allowed;
    }

    .b-checkbox.is-circular label::before {
      border-radius: 50%;
    }

    .b-checkbox.is-inline {
      margin-top: 0;
    }
  `]
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
      status: ['', [Validators.required]]
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });
  }
}
