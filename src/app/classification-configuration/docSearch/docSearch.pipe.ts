import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'DocSearch'
})

export class DocSearchPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        const docType = args;
        return value.filter((doc: any) => {
            return doc.DocTypeName === docType;
        });
    }
}
