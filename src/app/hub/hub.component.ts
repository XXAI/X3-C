import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  private mostrar: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }

}
