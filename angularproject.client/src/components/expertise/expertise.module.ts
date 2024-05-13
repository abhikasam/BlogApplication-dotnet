import { NgModule } from "@angular/core";
import { ExpertiseIndexComponent } from "./index/index.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { ExpertiseComponent } from './model/model.component';


@NgModule({
  declarations: [ExpertiseIndexComponent, ExpertiseComponent],
  exports: [ExpertiseIndexComponent],
  imports: [BrowserModule, HttpClientModule, CommonModule]
})
export class ExpertiseModule {

}
