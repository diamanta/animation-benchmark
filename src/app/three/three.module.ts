import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeComponent } from './three.component';



@NgModule({
  declarations: [
    ThreeComponent
  ],
  exports: [
    ThreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeModule { }
