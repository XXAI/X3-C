import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-modal-turnos',
  templateUrl: './modal-turnos.component.html'
})

export class ModalTurnosComponent {
  dato2: FormGroup;
  actualizacion;
  error_actualizacion;
  actualizacion_usuario;
  tieneid = false;
  mostrar_pantalla= false;
  tab = 2;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    this.dato2 = this.fb.group({
      clues: ['', [Validators.required]],
      jurisdiccion_id: [''],
      nombre: [''],
      activa: [''],
      director_id: [''],
      clues_turnos: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['clues']) {
        this.tieneid = true;
      }
    });
    // Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById('catalogoTurno').click();
  }

  ngAfterViewInit() {
    document.getElementById('actualizar').click();
  }
}
