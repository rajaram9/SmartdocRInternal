import { Component, OnInit } from '@angular/core';
import { ClassificationOutputService } from './classification-upload-batch.service';


@Component({
  selector: 'si-classification-upload-batch',
  templateUrl: 'classification-upload-batch.html',
  styleUrls: ['classification-upload-batch.css'],
  providers: [ClassificationOutputService]
})
export class ClassificationBatchUploadComponent implements OnInit {
  files: any[];
  uploadfilename: any[];
  constructor(private classificationOutputService: ClassificationOutputService) { }

  ngOnInit() {
    this.getFiles();
  }
  onFileUploaded(batches: any[]) {
    this.files = this.files.concat(batches);
  }
  getFiles() {
    this.classificationOutputService.getBatches().subscribe(
      data => { this.files = data; },
      error => { }
    );
  }
}
