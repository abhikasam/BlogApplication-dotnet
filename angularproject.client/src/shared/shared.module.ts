import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, BodyComponent],
  exports: [HeaderComponent, BodyComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class SharedModule { }
