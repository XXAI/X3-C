import { Component, OnInit } from '@angular/core';
import { ActasService } from '../actas.service';

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

  constructor(private actasService:ActasService) { }

  ngOnInit() {
    
    this.cargando = true;
    this.actasService.stats().subscribe(
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
