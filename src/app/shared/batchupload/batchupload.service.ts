import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/http';


@Injectable()
export class BatchuploadService {

  constructor(private http: Http) { }
  uploadFile(file: any): Observable<string> {
    return Observable.create((observer: any) => {

      const formData = new FormData();
      formData.append(file.name, file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://192.168.101.25:8057/api/upload', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next('Upload done');
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send(formData);
    });
  }
  extractdata(res: Response) {
    if (res.status === 200) {
      const body = res.json();
      return body || {};
    }
    return null;
  }

  errorhandler(error: any) {
    return Observable.throw('');
  }
}
