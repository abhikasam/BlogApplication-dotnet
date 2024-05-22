import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
