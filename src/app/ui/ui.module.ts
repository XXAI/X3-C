import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsPickerComponent } from './actions-picker/actions-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ActionsPickerComponent
  ] , 
  declarations: [ActionsPickerComponent]
})
export class UIModule { }
