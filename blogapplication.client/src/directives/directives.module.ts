import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedDirective } from './authorized.directive';
import { AuthorizedRolesDirective } from './authorized-roles.directive';



@NgModule({
  declarations: [
    AuthorizedDirective, AuthorizedRolesDirective
  ],
  exports: [
    AuthorizedDirective, AuthorizedRolesDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
