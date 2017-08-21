declare const FormData: any;
declare const XMLHttpRequest: any;

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadService {
  constructor(private http: Http) { }

  uploadFilesToServer(files: any[], uploadUrl: string, docName: string = '', docTypeName: string = ''): Observable<string> {
    return Observable.create((observer: any) => {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append(files[i].name, files[i]);
      }
      if (docName != '') {
        formData.append('docName', docName);
      }
      if (docTypeName != '') {
        formData.append('docTypeName', docTypeName);
      }
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const jsonObj = JSON.parse(xhr.response);
            observer.next(jsonObj);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send(formData);
    });
  }
}
