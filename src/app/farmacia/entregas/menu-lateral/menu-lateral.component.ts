import { Component, OnInit } from '@angular/core';
import { EntregasService } from '../entregas.service';


@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
  providers: [EntregasService]
})
export class MenuLateralComponent implements OnInit {
  private cargando: boolean = false;
  private stats: any = { 
    en_espera: 0,
    pendientes: 0,
    finalizados: 0
  };

  constructor( private entregasService: EntregasService) { }

  ngOnInit() {
    
    this.cargando = true;
    this.entregasService.stats().subscribe(
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
