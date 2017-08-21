import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class HelperService {

  private helpPanel = new Subject();
  helpPanel$ = this.helpPanel.asObservable();

  constructor() { }

  getDistinctValueOfProperty(array: any[], prop: string) {
    const distinctArray: any = [];
    for (const obj of array) {
      const propValue = obj[prop];
      if (distinctArray.indexOf(propValue) === -1) {
        distinctArray.push(propValue);
      }
    }
    return distinctArray;
  }
  getFileExtension(filename: string) {

    return filename.substr(filename.lastIndexOf('.') + 1);
  }
  openHelpPanel() {
    this.helpPanel.next();
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
