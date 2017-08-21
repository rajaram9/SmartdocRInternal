import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';



import { AppConfigService } from './../../app.config.service';
import { HelperService } from './../../core/helper-service/helper.service';

@Injectable()
export class ClientDocumentsMappingService {
  apiUrl: string;
  constructor(private appConfigService: AppConfigService
    , private helperService: HelperService,
    private http: Http) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }
  getDocumentTypes() {
    return this.http.get(`${this.apiUrl}api/GetDocumentTypes`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
  saveClientDocumentMappings(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.apiUrl}api/SaveClientDocumentsMappings`, body, options)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }

  getClientDocumentsMappings() {
    return this.http.get(`${this.apiUrl}api/GetClientDocumentsMappings`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
}
