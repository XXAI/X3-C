import { Component, OnInit, Input } from '@angular/core';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'menu-farmacia',
  templateUrl: './menu-farmacia.component.html',
  styleUrls: ['./menu-farmacia.component.css']
})
export class MenuFarmaciaComponent implements OnInit {

  private usuario: any = {}

  @Input() modulo:string;
  @Input() icono:string;
  @Input() url:string;

  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));


  }

}
