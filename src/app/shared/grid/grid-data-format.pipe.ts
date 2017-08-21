import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridDataFormat'
})

export class GridDataFormatPipe implements PipeTransform {
  transform(data: any, args: any[]): any {
    if (!data) {
      return null;
    }
    const keys: any = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        keys.push({ key: key, value: data[key] });
      }
    }
    return keys;
  }
}
