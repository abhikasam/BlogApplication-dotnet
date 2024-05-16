import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';
import { TextShorterPipe } from './text-shorter.pipe';



@NgModule({
  declarations: [
    DateFormatPipe,
    TextShorterPipe
  ],
  exports: [DateFormatPipe, TextShorterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
