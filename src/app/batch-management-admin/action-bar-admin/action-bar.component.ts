import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FileUploadTriggerDirective } from './fileUploadTrigger.directive';
import { UploadService } from '../../core/upload-service/upload.service';
import { AppConfigService } from './../../app.config.service';

@Component({
  selector: 'si-action-bar',
  templateUrl: 'action-bar.component.html',
  styleUrls: ['action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @ViewChild(FileUploadTriggerDirective) fileUploadTriggerDirective: FileUploadTriggerDirective;
  @Output() newBatch = new EventEmitter();
  @Output() onToggleFilter = new EventEmitter();
  apiUrl: string;
  constructor(private uploadService: UploadService,
    private appConfigService: AppConfigService) {
    this.apiUrl = this.appConfigService.getConfig('apiUrl');
  }

  ngOnInit() { }

  triggerUpload() {
    this.fileUploadTriggerDirective.openFileDialog();
  }
  toggleFilter() {
    this.onToggleFilter.emit();
  }
  onFileChange(event: any) {
    const files = event.target.files;
    const uploadUrl = `${this.apiUrl}api/upload`;
    this.uploadService.uploadFilesToServer(files, uploadUrl).subscribe(
      successResponse => {
        const response = successResponse;
        this.newBatch.emit(response);
      }
    );
  }
}
