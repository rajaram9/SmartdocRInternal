import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfigService } from '../../app.config.service';
import { HelperService } from '../../core/helper-service/helper.service';

@Injectable()
export class ImageViewerService {
  apiUrl: string;
  ocrServiceUrl: string;
  constructor(
    private appConfigService: AppConfigService,
    private helperService: HelperService,
    private http: Http) {
    this.ocrServiceUrl = this.appConfigService.getConfig('ocrServiceUrl');
  }
  test() {
    console.log('image service test');
  }
  getOcrData(imageData) {
    console.log('image service');
    return this.http.post(`${this.ocrServiceUrl}`, imageData)
      .map(this.helperService.extractdata)
      .catch(this.helperService.errorhandler);
  }
}
