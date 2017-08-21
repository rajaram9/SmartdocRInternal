import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as _ from 'lodash';
import { AppConfigService } from '../../app.config.service';
import { HelperService } from '../helper-service/helper.service';

@Injectable()
export class BatchImageService {
  apiUrl: string;
  constructor(
    private appConfigService: AppConfigService,
    private http: Http) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }

  getBatchImages(batchName: string) {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/batchImages?BatchName=${batchName}`)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }

  getSampleImages(docName: string, docTypeName: string) {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/GetSampleImages?docName=${docName}&docTypeName=${docTypeName}`)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }

  formatBatchImage(batchImages: any[], batchName: string): Observable<any[]> {
    return Observable.create((observer: any) => {
      const pages = this.constructPages(batchImages, batchName);
      const sortpages = _.sortBy(pages, function (obj) {
        const cc = [], s = obj.displayName;
        for (let i = 0, c; c = s.charAt(i); i++) {
          c === +c ? cc.push(+c) : cc.push(c.charCodeAt(0));
        }
        return +cc.join('');
      });
      const groupedPages = this.groupingPages(sortpages);
      const headeredPages = this.constructHeaders(groupedPages);
      observer.next(headeredPages);
      observer.complete();
    });
  }
  constructPages(batchImages: any[], batchName: string) {
    return batchImages.map((image: string) => {
      const imageNameArray = image.split('~');
      const groupName = `${imageNameArray[0]}~${imageNameArray[1]}`;
      const groupDisplayName = `${imageNameArray[0]}`;
      const displayName = `${imageNameArray[0]}-${imageNameArray[2]}`;

      return {
        originalName: image,
        updatedName: image,
        displayName: displayName,
        groupName: groupName,
        groupDisplayName: groupDisplayName,
        isNameUpdated: false,
        path: `${batchName}` + `\\Images\\` + `${image}`
      };
    });
  }
  groupingPages(pages: any[]) {
    return _.groupBy(pages, (page: any) => { return page.groupName; });
  }
  constructHeaders(groupedPages: any) {
    const headeredPages: any[] = [];
    for (const key in groupedPages) {
      if (groupedPages.hasOwnProperty(key)) {
        let isClassified = true;
        const pageGroup = groupedPages[key];
        const pageProperty = pageGroup[0];

        if (key.toLowerCase().indexOf('unclassfied') !== -1 || key.toLowerCase().indexOf('unknown') !== -1) {
          isClassified = false;
        }

        const headerObject = {
          name: pageProperty.groupDisplayName,
          nameWithIndex: pageProperty.groupName,
          isClassified: isClassified,
          isExpanded: true,
          pages: pageGroup
        };
        headeredPages.push(headerObject);
      }
    }
    return headeredPages;
  }

  extractdata(res: Response) {
    if (res.status === 200) {
      const body = res.json();
      return body || {};
    }
    return null;
  }
  errorhandler(error: any) {
    return Observable.throw(error);
  }
}
