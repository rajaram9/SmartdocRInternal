import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppConfigService } from '../../../app.config.service';
import { HelperService } from '../../../core/helper-service/helper.service';

@Injectable()
export class BatchMoveService {
  apiUrl: string;
  constructor(
    private appConfigService: AppConfigService,
    private helperService: HelperService,
    private http: Http) {

    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }

  getDocTypes() {
    return this.http.get(`${this.apiUrl}api/docTypes`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
  getBatchs() {
    return this.http.get(`${this.apiUrl}api/getBatches`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);

  }
}
