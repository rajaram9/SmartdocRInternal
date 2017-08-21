import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'DocTypePipe'
})

@Injectable()
export class DocTypePipe implements PipeTransform {

  transform(value: any, args?: any) {

    if (args) {
      return value.filter((val: any) => val.toLowerCase().indexOf(args.toLowerCase()) !== -1);
    } else {
      return value;
    }
  }
}
