import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExceptionComponent } from './exception/exception.component';



@NgModule({
  declarations: [
    MultiSelectComponent,
    PaginationComponent,
    AccessDeniedComponent,
    DashboardComponent,
    ExceptionComponent
  ],
  exports: [MultiSelectComponent, PaginationComponent, AccessDeniedComponent, DashboardComponent, ExceptionComponent],
  imports: [
    CommonModule, RouterModule, NgbPaginationModule
  ]
})
export class SharedModule { }
