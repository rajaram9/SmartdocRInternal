import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../core/upload-service/upload.service';
import { AppConfigService } from './../../app.config.service';


@Component({
  selector: 'si-batchupload',
  templateUrl: 'batchupload.component.html',
  styleUrls: ['batchupload.component.css']

})
export class BatchUploadComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter();
  @Output() uploadfilename = new EventEmitter();
  apiUrl: string;
  constructor(private uploadService: UploadService, private appConfigService: AppConfigService
  ) {
    this.apiUrl = appConfigService.getConfig('apiUrl');
  }

  ngOnInit() { }
  onChange(event: any) {
    const files = event.srcElement.files;
    const uploadUrl = `${this.apiUrl}api/upload`;
    this.uploadService.uploadFilesToServer(files, uploadUrl).subscribe(
      data => {
        this.fileUploaded.emit(data);
      },
      error => { }
    );
  }
}


