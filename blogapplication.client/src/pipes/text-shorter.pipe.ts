import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textshorter'
})
export class TextShorterPipe implements PipeTransform {
  transform(text: string, maxlength: number = 100) {
    if (text.length < maxlength)
      return text;
    return text.substring(0, maxlength - 3) + '...';
  }
}
