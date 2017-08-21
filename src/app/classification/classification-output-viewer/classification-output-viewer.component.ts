declare var $: any;
declare var saveAs: any;

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ClassificationOutputService } from '../classification-upload-batch/classification-upload-batch.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import * as JSZip from 'jszip';
import { AppConfigService } from './../../app.config.service';


@Component({
  selector: 'si-classification-output-viewer',
  templateUrl: 'classification-output-viewer.component.html',
  styleUrls: ['classification-output-viewer.component.css'],
  providers: [ClassificationOutputService]
})
export class ClassificationOutputViewerComponent implements OnInit {
  classificationOutput: any;
  formatedClassifiedOutput: any[] = [];
  formatedClassifiedOutputKeys: any[] = [];
  formatedUnClassifiedOutput: any[] = [];
  outfiles: any;
  UnClassifiedfiles: any;
  parentfilename: any;
  file: any;
  Processingfiles: any = {};
  private sub: any;
  apiUrl: string;
  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private classificationOutputService: ClassificationOutputService, private appConfigService: AppConfigService
  ) {
    this.apiUrl = appConfigService.getConfig('apiUrl');
  }

  formatClassificationOutput(data: any) {

    const formatedData = data.reduce((obj, ele) => {
      const fileName = ele.filename.split('~')[1];
      if (!obj[fileName]) {
        obj[fileName] = {};
        obj[fileName].name = fileName;
        obj[fileName].pages = [];
      }
      const tempObj: any = {};
      tempObj.createddate = ele.createddate;
      tempObj.filepath = ele.filepath;
      tempObj.filename = ele.filename;
      obj[fileName].pages.push(tempObj);
      return obj;
    }, {});
    return formatedData;
  }
  formatUnClassifiedOutput() {
    this.formatedUnClassifiedOutput = this.UnClassifiedfiles;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.parentfilename = params.batchname;
      const timer = Observable.timer(0, 10000);
      timer.subscribe(t => {
        this.classificationOutputService.getoutData(params.batchname, 'Classified').subscribe(
          data => {
            this.outfiles = data;
            this.formatedClassifiedOutput = this.formatClassificationOutput(data);
            this.formatedClassifiedOutputKeys = Object.keys(this.formatedClassifiedOutput);

          },
          error => { }
        );
        this.classificationOutputService.getoutData(params.batchname, 'UnClassified').subscribe(
          data => {
            this.UnClassifiedfiles = {};
            this.formatedUnClassifiedOutput = [];
            this.UnClassifiedfiles = data;
            this.formatUnClassifiedOutput();
          },
          error => { }
        );
        this.classificationOutputService.getImages(params.batchname, 'Pdfs').subscribe(
          data => {
            this.Processingfiles = {};
            this.Processingfiles = data[0];
          },
          error => { }
        );
      });
    });
  }
  downloadZip() {
    const _this = this;
    const zip = new JSZip();
    const scriptDeferred = this.classificationOutputService.downloadFiles(this.outfiles);
    scriptDeferred.done(function () {
      const allFileRequests = this;
      $.each(arguments, function (index: number, responseData: any) {
        const request = allFileRequests[index];
        const requestFileName = _this.fileNameFromURL(request.url);
        zip.file(requestFileName, responseData[0], { binary: true });
      });
      zip.generateAsync({ type: 'blob' })
        .then(function (content: any) {
          saveAs(content, 'Export.zip');
        });
    });
  }
  downloadZip1() {
    const _this = this;
    const zip = new JSZip();
    const scriptDeferred = this.classificationOutputService.downloadFiles(this.UnClassifiedfiles);
    scriptDeferred.done(function () {
      const allFileRequests = this;
      $.each(arguments, function (index: number, responseData: any) {
        const request = allFileRequests[index];
        const requestFileName = _this.fileNameFromURL(request.url);
        zip.file(requestFileName, responseData[0], { binary: true });
      });
      zip.generateAsync({ type: 'blob' })
        .then(function (content: any) {
          saveAs(content, 'Export.zip');
        });
    });
  }
  fileNameFromURL(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }
}

