import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  private cargando: boolean = false;
  private stats: any = { 
    abiertos: 1,
    en_espera: 2,
    pendientes: 3,
    en_camino: 1
  };

  constructor() { }

  ngOnInit() {
  }

}
