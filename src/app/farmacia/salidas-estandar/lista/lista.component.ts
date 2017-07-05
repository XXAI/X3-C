import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salidas-recetas-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {
  usuario;

  ngOnInit() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  
}