import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  cargando: boolean = false;
  stats: any = {
    todos: 0, 
    borradores: 0,
    en_transito: 0,
    por_surtir: 0,
    finalizados: 0,
    expirados: 0
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
