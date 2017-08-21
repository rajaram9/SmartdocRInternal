import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfigService } from './../../app.config.service';

@Injectable()
export class BatchManagementAdminService {
  apiUrl: string;
  constructor(private http: Http, private appConfigService: AppConfigService) {
    this.apiUrl = appConfigService.getConfig('apiUrl');
  }

  getBatches() {
    return this.http.get(`${this.apiUrl}api/getBatches`)
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
