import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value: Timestamp | undefined): string {
    return this.datePipe.transform(value?.toMillis(), 'short') ?? '';
  }
}
