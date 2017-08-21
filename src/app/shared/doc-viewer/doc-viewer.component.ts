import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { AppConfigService } from '../../app.config.service';

@Component({
  selector: 'si-doc-viewer',
  templateUrl: 'doc-viewer.component.html',
  styleUrls: ['doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() doc: any = {};
  @Input() markField: any = {};
  @Input() viewerWidth = '900px';
  @Input() widthInRF = 0;
  @Input() heightInRF = 0;
  @Input() Frompage: string;
  @Input() FromExtConfig: string;
  @Output() ocrbandResult = new EventEmitter();
  @Output() ocrbandResult1 = new EventEmitter();

  @ViewChild('imageViewer') imageViewer: ImageViewerComponent;
  dataPointObj: any;
  imageFolderPath = '';
  imagePath = '';

  constructor(private appConfigService: AppConfigService) {
    this.imageFolderPath = this.appConfigService.getConfig('ocrImageEndPoint');
  }

  onOCRSuccess(ocrData) {
    if (this.FromExtConfig === 'ExtConfig') {
      //this.markField.Extractdata=ocrData;
      this.ocrbandResult.emit(ocrData);
    }
    else {
      this.markField.value = ocrData;
      this.markField.confidence = 85;
    }
  }

  onOcrDataCordinates(ocrData) {
    if (this.FromExtConfig === 'ExtConfig') {
      //this.markField.Extractdata=ocrData;
      this.ocrbandResult1.emit(ocrData);
    }
    else {
      this.markField.value = ocrData;
      this.markField.confidence = 85;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
  }
  ngOnChanges() {
    if (this.doc && this.doc.path !== undefined) {
      this.imagePath = `${this.imageFolderPath}${this.doc.path}`;
    }

    if (this.markField && this.markField.DataPoints) {
      const [left, top, right, bottom] = this.markField.DataPoints.split('/');
      // const width = parseFloat(right) - parseFloat(left);
      // const height = parseFloat(bottom) - parseFloat(top);
      this.dataPointObj = {
        left: parseFloat(left),
        top: parseFloat(top),
        right: parseFloat(right),
        bottom: parseFloat(bottom)
      };
    }
  }
}
