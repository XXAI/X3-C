import { Component, OnInit } from '@angular/core';
import { MovimientosSalidasService } from '../movimientos-salidas.service';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  private cargando: boolean = false;
  private stats: any = {
    manual: 0
  };

  constructor(private MovimientosSalidasService:MovimientosSalidasService) { }

  ngOnInit() {
    
    this.cargando = true;
    this.MovimientosSalidasService.stats().subscribe(
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
