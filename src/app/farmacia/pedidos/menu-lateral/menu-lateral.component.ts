import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  private cargando: boolean = false;
  private stats: any = { 
    abiertos: 0,
    en_espera: 0,
    pendientes: 0,
    en_camino: 0
  };

  constructor(private pedidosService:PedidosService) { }

  ngOnInit() {
    
    this.cargando = true;
    this.pedidosService.stats().subscribe(
      response => {
        this.cargando = false;
        this.stats = response;
      },
      error => {
        this.cargando = false;
        console.log(error);
      }
    );
  }

}
