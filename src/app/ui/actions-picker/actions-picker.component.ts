import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-actions-picker',
  templateUrl: './actions-picker.component.html',
  styleUrls: ['./actions-picker.component.css']
})
export class ActionsPickerComponent implements OnInit {

  @Input() actions:Array<{ key: number, text: string}> = [];
  @Input() checked:boolean = false;

  @Output() onApply = new EventEmitter<number>();
  @Output() onCheck = new EventEmitter<boolean>();

  pickedAction:number = -1;

  constructor() { }

  ngOnInit() {
  }
  
  check(){
    this.checked = !this.checked;
    this.onCheck.emit(this.checked);
  }
  pickAction(key:number){
    this.pickedAction = key;
  }
  apply(){
    this.onApply.emit(this.pickedAction);
  }
}
