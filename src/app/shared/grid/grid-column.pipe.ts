import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValuePair'
})

export class KeyValuePairPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (!value) {
      return null;
    }
    const keys: any = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({ key: key, value: value[key] });
      }
    }
    return keys;
  }
}
