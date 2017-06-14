import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admision-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mostrarMenuAside: boolean = false;
  usuario: any = {};
  constructor() { }

  DatoUnidad: String;

  ngOnInit() {
    this.DatoUnidad = JSON.parse(localStorage.getItem("usuario"));
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

}
