import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfigService } from '../app.config.service';
import { HelperService } from '../core/helper-service/helper.service';

@Injectable()
export class ManualClassificationService {
  apiUrl: string;
  constructor(
    private appConfigService: AppConfigService,
    private helperService: HelperService,
    private http: Http) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }
  generateImageFromPdf(batchName: string) {
    return this.http.get(`${this.appConfigService.getConfig('apiUrl')}api/createImageFromPdf?BatchName=${batchName}`)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }
  saveClassifiedPages(batchName: string, docTypes: any[]) {
    const docForSave = this.formatDocTypeForSave(batchName, docTypes);
    return this.http.post(`${this.apiUrl}api/SaveManualClassification`, docForSave)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }
  formatDocTypeForSave(batchName: string, docTypes: any[]) {
    const docForSave: any = {};
    const pagesForSave: any[] = [];
    const extn = this.helperService.getFileExtension(docTypes[docTypes.length - 1].pages[0].originalName);
    docTypes.map(docType => {
      docType.pages.map((page: any, index: number) => {
        pagesForSave.push({
          originalName: page.originalName,
          updatedName: `${docType.nameWithIndex}~${index + 1}.${extn}`
        });
      });
    });

    docForSave.batchName = batchName;
    docForSave.pages = pagesForSave;
    return docForSave;
  }
  movePageToOtherBatch(targetDetails: any, selectedPages: any[]) {
    const moveDetailsObj = selectedPages.map(selectedPage => {
      return {
        oldPath: selectedPage.page.path,
        newPath: `${targetDetails.batch}\\Images\\${targetDetails.doc}~1.png`
      };
    });
    return this.http.post(`${this.apiUrl}api/movePages`, moveDetailsObj)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }
  generatePdf(batchName: string, pdfPages: any[]) {
    const pdfRequest = {
      batchName: batchName,
      Images: pdfPages
    };
    return this.http.post(`${this.apiUrl}api/CreatePdfFromImages`, pdfRequest)
      .map(this.extractdata)
      .catch(this.errorhandler);
  }
  removeViewMode(docTypes: any[]) {
    docTypes.map(docType => {
      docType.pages.map(page => {
        page.isViewMode = false;
      });
    });
  }
  addViewMode(page: any) {
    page.isViewMode = true;
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
