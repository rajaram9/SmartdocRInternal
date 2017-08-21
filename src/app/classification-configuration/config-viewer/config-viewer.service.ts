import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { AppConfigService } from '../../app.config.service';


@Injectable()
export class ConfigViewerService {
  constructor(private http: Http, private appConfigService: AppConfigService, ) { }

  GetData() {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/GetClassificationConfig`)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }

  saveData(data: any[]) {
    // Note: cache should not be re-used by repeated calls to JSON.stringify.
    var cache = [];
    const body =JSON.stringify(data, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; 
   // const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.appConfigService.getConfig('apiUrl')}api/SaveData`, body, options)
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
