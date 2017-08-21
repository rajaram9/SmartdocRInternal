import { Component, OnInit, Output, EventEmitter, Input,OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ActionFormService } from './new-classification-config.service';
import { UploadService } from '../../core/upload-service/upload.service';
import { AppConfigService } from './../../app.config.service';

@Component({
  selector: 'si-new-classification-config',
  templateUrl: 'new-classification-config.component.html',
  styleUrls: ['new-classification-config.component.css'],
})
export class NewClassificationConfigComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter();
  newClassification: any = {};
  @Input() distinctDocType: any[] = [];
  @Input() Newdocname: any;
  @Input() selectedDocType: any = {};
  @Input() clickonnewdoctype: Boolean;
  newdoc: any = {};
  cars: SelectItem[];
  files: FileList;
  apiUrl: string;

  constructor(private actionFormService: ActionFormService,
    private uploadService: UploadService,
    private appConfigService: AppConfigService) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }

  ngOnInit() {
    //console.log(this.selectedDocType.docName);
    if (this.clickonnewdoctype == true) {
      this.newClassification.docName = this.selectedDocType.docName;
    }

  }
  ngOnChanges() {
    if (this.clickonnewdoctype == true) {
      this.newClassification.docName = this.selectedDocType.docName;
    }
  }
  bladeClick(event: any) {
    if (event.offsetX < 0 && this.hasClass(event.srcElement, 'action-blade')) {
      this.closeBlade();
    }
  }
  hasClass(element: any, className: string) {
    if (('' + element.className + '').replace(/[\n\t]/g, '').indexOf(className) > -1) {
      return true;
    } else {
      return false;
    }
  }
  closeBlade() {
    this.close.emit();
  }
  fileChange(event) {
    this.files = event.srcElement.files;
    const files = event.target.files;
    // if (this.newClassification.docTypeName === '') {
    //   alert('please enter document type');
    // }
    const uploadUrl = `${this.apiUrl}api/uploadSampleFile`;
    this.uploadService.uploadFilesToServer(files, uploadUrl, this.selectedDocType.docName, this.newClassification.docTypeName).subscribe(
      successResponse => {
        const response = successResponse;
        this.newClassification.fileName = response;
        //this.newBatch.emit(response);
      }
    );
  }


  onSubmit() {
    //if (this.Newdocname === 'yes') {
    // console.log(this.newClassification.DocTypeName);
    if (this.clickonnewdoctype == false) {
      // this.newdoc.DocName = this.newClassification.docName;
      // this.newdoc.Createdby = 1;
      // this.actionFormService.saveData(this.newdoc).subscribe(
      //   data => { },
      //   error => { }
      // );
      //this.newClassification.docTypeName = '';
      this.newClassification.docTypeName = [];
      //this.newClassification.Ind = "added";
      this.submit.emit(this.newClassification);
      this.closeBlade();
    }
    else {
      this.newClassification.keywords = [];
      //this.newClassification.Ind = "added";
      this.submit.emit(this.newClassification);
      this.closeBlade();
    }
    //}
  }
}
