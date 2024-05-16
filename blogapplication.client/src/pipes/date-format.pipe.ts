import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateformat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date, format: string) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return moment(date).format(format);
  }
}
