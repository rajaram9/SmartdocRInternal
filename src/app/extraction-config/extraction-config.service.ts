import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfigService } from '../app.config.service';
import { HelperService } from '../core/helper-service/helper.service';


@Injectable()
export class ExtractionConfigService {
  private apiUrl = '';
  private ocrServiceUrl = '';
  constructor(private appConfigService: AppConfigService,
    private helperService: HelperService,
    private http: Http) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
    this.ocrServiceUrl = this.appConfigService.getConfig('ocrServiceUrl');
  }

  saveExtractionConfig(docTypes: any) {
    //const body1 = JSON.stringify(docTypes);
    const body = JSON.stringify(docTypes);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.appConfigService.getConfig('apiUrl')}api/SaveExtractionConfig`, body, options)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }

  getExtractionConfig(docTypeID: Number) {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/GetExtractConfigbyID?docTypeID=${docTypeID}`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
  getOcrData(imageData) {
    console.log('image service');
    return this.http.post(`${this.ocrServiceUrl}`, imageData)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
  // return this.http.post(`${this.apiUrl}api/saveExtractionConfig`, docTypes)
  //   .map(this.helperService.extractdata)
  //   .catch(this.helperService.errorhandler);
  //}
}
