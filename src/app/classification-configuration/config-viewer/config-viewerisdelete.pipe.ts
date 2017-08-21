import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'DocTypeisDeletePipe'
})

@Injectable()
export class DocTypeisDeletePipe implements PipeTransform {
  value1: Boolean = false;
  transform(value: any, args?: any) {
    return value.filter((val: any) => (val.isdeleted === false));
    // if (args) {
    //   return value.filter((val: any) => (val.isdeleted === false));
    // } else {
    //   return value;
    // }
  }
}
