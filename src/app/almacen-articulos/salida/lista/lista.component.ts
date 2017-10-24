import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salida-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
  private tamano;
  ngOnInit() {
    this.tamano = document.body.clientHeight;
  }
}