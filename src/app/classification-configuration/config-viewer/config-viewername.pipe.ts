import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'DocTypeNamePipe'
})

@Injectable()
export class DocTypeNamePipe implements PipeTransform {

  transform(value: any, args?: any) {

    if (args) {
      return value.filter((val: any) => (val.docTypeName.toLowerCase() === args.toLowerCase()));
    } else {
      return value;
    }
  }
}
