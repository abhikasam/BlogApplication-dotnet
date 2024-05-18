import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    MultiSelectComponent,
    PaginationComponent
  ],
  exports: [MultiSelectComponent, PaginationComponent],
  imports: [
    CommonModule, RouterModule, NgbPaginationModule
  ]
})
export class SharedModule { }
