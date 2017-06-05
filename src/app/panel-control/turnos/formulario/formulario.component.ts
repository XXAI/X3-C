import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'almacenes-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  form_almacen_tipos_servicios: any;
  private tieneid: boolean = false;
  tipos_almacen: any[] = [
    { id: "ALMPAL", nombre: "ALMPAL" },
    { id: "JURIS", nombre: "JURIS" },
    { id: "UNMED", nombre: "UNMED" },
    { id: "LAB", nombre: "LAB" },
    { id: "FARMACIA", nombre: "FARMACIA" },
    { id: "CENDIS", nombre: "CENDIS" }
  ];

  niveles_almacen: any[] = [
    { id: 1, nombre: "HACE PEDIDOS AL PROVEEDOR" },
    { id: 2, nombre: "HACE PEDIDOS A OTRO ALMACEN DENTRO DE LA CLUES" }
  ];
  tab: number = 2;
  

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario);
    
    this.dato = this.fb.group({
      clues: ['', [Validators.required]],
      jurisdiccion_id:[''],
      nombre:[''],
      activa:[''],
      director_id:[''],
      clues_turnos: this.fb.array([])
    });

    this.dato.patchValue({
      clues: usuario.clues_activa.clues,
      jurisdiccion_id: usuario.clues_activa.jurisdiccion_id,
      nombre: usuario.clues_activa.nombre,
      activa: usuario.clues_activa.activa,
      director_id: usuario.clues_activa.director_id,
    });

    this.form_almacen_tipos_servicios = {
      tipo_movimiento_id: ['', [Validators.required]]
    };
    this.route.params.subscribe(params => {
      if (params['clues']) {
        this.tieneid = true;
      }
    });
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

  ngAfterViewInit() {
    //Solo si se tiene el control mover izquierda-derecha poner un <a id="initMover" (click)="ctrl.initMover(ctrl.dato.controls.almacen_tipos_movimientos.controls, ctrl.tipos_movimientos)>refresh</a>
    //incrementar el tiempo segun sea el caso para que cargue el catalogo en este caso va a acrgar 2 catalogos por eso pongo 5000
    setTimeout(() => {
      document.getElementById("initMover").click();
    }, 5000);

  }


}