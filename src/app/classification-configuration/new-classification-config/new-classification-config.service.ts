import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { AppConfigService } from '../../app.config.service';

@Injectable()
export class ActionFormService {

  constructor(private http: Http, private appConfigService: AppConfigService) { }


  saveData(data: any[]) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.appConfigService.getConfig('apiUrl')}api/SaveNewDocumentName`, body, options)
      .map(this.extractdata)
      .catch(this.errorhandler);

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
