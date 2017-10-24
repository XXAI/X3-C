import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'entrada-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
  private tamano;
  ngOnInit() {
    this.tamano = document.body.clientHeight;
  }
}