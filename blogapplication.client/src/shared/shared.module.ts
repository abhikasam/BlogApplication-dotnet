import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from './multi-select/multi-select.component';



@NgModule({
  declarations: [
    MultiSelectComponent
  ],
  exports: [MultiSelectComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class SharedModule { }
