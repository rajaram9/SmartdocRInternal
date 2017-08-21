import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfigService {

  localConfig = {
    // apiUrl: 'http://localhost:8635/',
    // ocrImageEndPoint: 'http://192.168.0.103:8080/',
    apiUrl: 'http://localhost:8635/',
    ocrImageEndPoint: 'http://127.0.0.1:8080/',
    ocrImagePath: 'E:\SmartIndexFiles\OutputFiles',
    ocrSampleFilesPath: 'D:\SmartIndexFiles\SampleFiles',
    ocrSampleImagesPath: 'D:\SmartIndexFiles\SampleImages\\',
    ocrServiceUrl: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB6H4lBjC3qZ4KgKw8oRnDR82arwJXzxvo'
  };

  productionConfig = {
    apiUrl: 'http://10.254.40.136:8082/',
    ocrImageEndPoint: 'http://10.254.40.136:8083/',
    ocrImagePath: 'D:\SmartIndexFiles\OutputFiles',
    ocrSampleFilesPath: 'E:\SmartIndexFiles\SampleFiles',
    ocrSampleImagesPath: 'D:\SmartIndexFiles\SampleImages',
    ocrServiceUrl: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB6H4lBjC3qZ4KgKw8oRnDR82arwJXzxvo'
  };

  getConfig(key: string) {
    const config = environment.production === true ? this.productionConfig : this.localConfig;
    const configValue = config[key];
    if (configValue) {
      return configValue;
    } else {
      return 'key not available in config';
    }
  }

}
