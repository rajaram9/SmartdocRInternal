import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as  Cropper from 'cropperjs';
import { ImageViewerService } from './image-viewer.service';

@Component({
  selector: 'si-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css', '../../../../node_modules/cropperjs/dist/cropper.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('image') image: any;
  @Input() imagePath: string;
  @Input() markField: string;
  @Output() ocrResult = new EventEmitter();
  @Output() ocrdataCordinates = new EventEmitter();
  @Input() widthInRF = 2550;
  @Input() heightInRF = 3330;
  @Input() Frompage: string;
  targetImage: any;
  cropper: Cropper;
  Canvasdata: any;
  toolboxclick: Number;
  constructor(private imageViewerService: ImageViewerService) {
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.targetImage = this.image.nativeElement;
    this.cropper = new Cropper(this.targetImage, {
      autoCrop: false,
      dragMode: 'crop',
      background: false,
      toggleDragModeOnDblclick: false,
      ready: this.cropperReady,
      cropstart: this.cropstart,
      cropmove: this.cropmove,
      cropend: (e) => { this.cropend(e); },
      crop: this.crop,
      preview: '.preview'
    });
    //console.log(this.Frompage);
    if (this.Frompage === 'Extraction') {
      setTimeout(() => {
        const dataPoint = {
          left: 100,
          top: 50,
          width: 150,
          height: 30
        };
        this.cropper.crop();
        this.cropper.setCropBoxData(dataPoint);
      }, 1000);
    }
  }

  cropperReady() {
    //   console.log('cropper ready');
  }
  cropstart() {
    //   console.log('crop start');
  }
  cropmove() {
    // console.log('crop move');
  }
  cropend(e) {
    if (e.detail.action === 'move' && e.detail.action === 'all') {
      return;
    }
    console.log('crop end');
    let cropBoxData = this.cropper.getCropBoxData();
    let Canvasdata = this.cropper.getCanvasData();
    let ContainerData = this.cropper.getContainerData();
    let CordinatesData = cropBoxData.left + '/' + cropBoxData.top + '/' + cropBoxData.height + '/' + cropBoxData.width + '/' + Canvasdata.height + '/' + Canvasdata.width + '/' + ContainerData.height + '/' + ContainerData.width;
    let croppedImage = this.cropper.getCroppedCanvas().toDataURL();
    croppedImage = croppedImage.replace('data:image/jpeg;base64,', '');
    croppedImage = croppedImage.replace('data:image/png;base64,', '');
    // console.log(croppedImage);
    const request = {
      requests: [{
        image: {
          content: croppedImage
        },
        features: [{
          type: 'TEXT_DETECTION',
          maxResults: 200
        }]
      }]
    };
    this.imageViewerService.getOcrData(request).subscribe(ocrData => {

      const ocrString = ocrData.responses.reduce((result, response) => {
        console.log(response);
        return result + response.fullTextAnnotation.text;
      }, '');
      //  console.log(ocrString);
      // this.preview = ocrString;
      this.ocrResult.emit(ocrString);
    });
    this.ocrdataCordinates.emit(CordinatesData);
  }
  crop() {
    // console.log('crop');
  }
  zoomIn() {
    this.cropper.zoom(0.1);
    this.toolboxclick = 1;
  }
  zoomOut() {
    this.cropper.zoom(-0.1);
    this.toolboxclick = 1;
  }
  rotateRight() {
    this.cropper.rotate(90);
    this.toolboxclick = 1;
  }
  rotateLeft() {
    this.cropper.rotate(-90);
    this.toolboxclick = 1;
  }
  reset() {
    this.cropper.reset();
    this.toolboxclick = 0;
    if (this.Frompage === 'Extraction') {
      setTimeout(() => {
        const dataPoint = {
          left: 100,
          top: 50,
          width: 150,
          height: 30
        };
        this.cropper.crop();
        this.cropper.setCropBoxData(dataPoint);
      }, 100);
    }
  }


  clearCrop() {
    this.cropper.setDragMode('move');
    this.cropper.clear();
  }
  ngOnChanges(changes) {
    if (changes.imagePath && changes.imagePath.currentValue) {
      setTimeout(() => {
        this.cropper.replace(this.imagePath);
        if (this.Frompage === 'Extraction') {
          setTimeout(() => {
            const dataPoint = {
              left: 100,
              top: 50,
              width: 150,
              height: 30
            };
            this.cropper.crop();
            this.cropper.setCropBoxData(dataPoint);
          }, 100);
        }
      }, 100);
    }
    if (changes.markField && changes.markField.currentValue) {
      // console.log(this.toolboxclick);
      // if (this.toolboxclick === 1) {
      //   this.cropper.reset();
      //   this.toolboxclick = 0;
      // }
      this.cropper.reset();
      setTimeout(() => {
        this.setCrop(this.markField);
      }, 100);
    }
  }
  setCrop(points?) {
    this.Canvasdata = this.cropper.getCanvasData();
    this.cropper.crop();
    const widthInRF = this.widthInRF;
    const heightInRF = this.heightInRF;
    const widthInSI = this.Canvasdata.width;
    const heightInSI = this.Canvasdata.height;

    const widthdiff = (748 - widthInSI) + widthInSI;
    //const heightdiff = (514 - heightInSI) + heightInSI;

    let siLeft = ((points.left) * (widthdiff / widthInRF));
    let siTop = ((points.top) * (heightInSI / heightInRF));
    const siBottom = ((points.bottom + 1) * heightInSI / heightInRF) - 1;
    const siRight = ((points.right + 1) * widthdiff / widthInRF) - 1;

    let dpWidth = siRight - siLeft;
    let dbHeight = siBottom - siTop;
    // console.log(dbHeight);
    // console.log(dpWidth);
    if (dpWidth < 100) {
      dpWidth = 100;
    }
    if (dbHeight < 10) {
      dbHeight = dbHeight + 10;
      // dpWidth = dpWidth + 10;
      // siLeft = siLeft + 10;
      // siTop = siTop + 10;
    }
    const dataPoint = {
      left: siLeft,
      top: siTop,
      width: dpWidth,
      height: dbHeight
    };
    this.cropper.setCropBoxData(dataPoint);
    this.cropper.setDragMode('crop');
  }

}
