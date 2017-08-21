declare const $: any;
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Response, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { AppConfigService } from './../../app.config.service';


@Injectable()
export class ClassificationOutputService {
  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private batches: any[] = [];
  apiUrl: string;
  ocrImageUrl: string;
  constructor(private http: Http, private appConfigService: AppConfigService) {
    this.apiUrl = appConfigService.getConfig('apiUrl');
    this.ocrImageUrl = appConfigService.getConfig('ocrImageEndPoint');
  }

  getBatches() {
    if (this.batches.length > 0) {
      return Observable.from(this.batches);
    } else {
      return this.http.get(`${this.apiUrl}api/getBatches`)
        .map(this.extractdata)
        .catch(this.errorhandler);
    }
  }

  getData(): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', 'name');
    params.set('foldername', 'name');
    this.options.search = params;

    return this.http.get(`${this.apiUrl}api/Getfiles`, this.options)
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
  getoutData(filename: string, foldername: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', filename);
    params.set('foldername', foldername);
    this.options.search = params;

    return this.http.get(`${this.apiUrl}api/Getfiles`, this.options)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }

  getImages(filename: string, foldername: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', filename);
    params.set('foldername', foldername);
    this.options.search = params;

    return this.http.get(`${this.apiUrl}api/GetImages`, this.options)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }

  downloadFiles(FileCollection: any) {
    const requests: any[] = [];
    $.each(FileCollection, function (index: number, fileDetails: any) {
      const req = $.ajax({
        url: `${this.ocrImageUrl}` + fileDetails.filepath,
        method: 'GET',
        mimeType: 'text/plain; charset=x-user-defined'
      });
      requests.push(req);
    });
    const defer = $.when.apply($, requests);
    return defer;
  }
}
