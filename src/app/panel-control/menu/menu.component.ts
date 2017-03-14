import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'panel-control-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private mostrarMenuAside: boolean = false;
  private usuario: any = {};
  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

}
