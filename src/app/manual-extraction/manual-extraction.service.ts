import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfigService } from '../app.config.service';
import { HelperService } from '../core/helper-service/helper.service';

@Injectable()
export class ManualExtractionService {
  private apiUrl = '';

  constructor(
    private appConfigService: AppConfigService,
    private helperService: HelperService,
    private http: Http) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }

  getExtractedData(batchID: number) {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/getExtractData?BatchID=${batchID}`)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }

  saveExtractionChanges(docTypes: any[]) {
    return this.http.post(`${this.apiUrl}api/SaveExtractionChanges`, docTypes[0])
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }

}
