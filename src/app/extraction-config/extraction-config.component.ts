import { Component, OnInit, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
//import { Subscription } from 'rxjs/Subscription';

import { ManualExtractionService } from '../manual-extraction/manual-extraction.service';
import { BatchImageService } from '../core/batch-image-service/batch-image.service';
import { ExtractionConfigService } from './extraction-config.service';

import { ExtractionDocCarouselComponent } from '../manual-extraction/extraction-doc-carousel/doc-carousel.component';
import { AppConfigService } from '../app.config.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { SelectItem } from 'primeng/primeng';


@Component({
  selector: 'si-extraction-config',
  templateUrl: './extraction-config.component.html',
  styleUrls: ['./extraction-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExtractionConfigComponent implements OnInit {
  //private routerSubscription: Subscription;
  @Input() selecteddoctype: any = [];
  private batchName: string;
  private batchID: number;
  batchData: any[] = [];
  docTypes: any[] = [];
  currentDocType: any[] = [];
  currentActiveDoc: any = [];
  cols: any[];
  gridData: any[] = [];
  fieldData: any[] = [];
  extractionTypes: any = [];
  selectedextractionTypes: string = 'OCR';
  car: Car = new PrimeCar();
  private routerSubscription: Subscription;
  private docName: string;
  private docTypeName: string;
  private docNameID: string;
  private docTypeID: string;
  display: boolean = false;
  selectedCar: Car;
  newCar: boolean;
  cars: Car[] = [];

  Brules: SelectItem[];
  selectedBrule: string;
  selectedBrules: string[] = [];

  Locators: SelectItem[];
  selectedLocators: string[] = [];
  popuprowindex: number;
  base64textString: any = {};

  classifycols: any[];


  collapsed: any = 'collapsed';
  loginForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private batchImageService: BatchImageService,
    private manualExtractionService: ManualExtractionService,
    private router: Router,
    private extractionConfigService: ExtractionConfigService, private appConfigService: AppConfigService, private formBuilder: FormBuilder) {
    // this.loginForm = this.formBuilder.group({

    // })
  }

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   docviewer123: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    //   datatable123: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    //   collapsed: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    // });
    // this.routerSubscription = this.activatedRoute.queryParams.subscribe(
    //   (param: any) => {
    //     this.docName = param['docName'];
    //     this.docTypeName = param['docTypeName'];
    //     this.docNameID = param['docNameID'];
    //     this.docTypeID = param['docTypeID'];
    //     this.getSampleImages(this.docName, this.docTypeName);
    //     this.getSamplegetExtractionConfigImages();

    //   });
    this.docName = this.selecteddoctype.docName;
    this.docTypeName = this.selecteddoctype.docTypeName;
    this.docNameID = this.selecteddoctype.cst_DocNameID;
    this.docTypeID = this.selecteddoctype.cst_DocTypeID;
    this.getSampleImages(this.docName, this.docTypeName);
    this.getSamplegetExtractionConfigImages();


    this.Brules = [];
    this.Brules.push({ label: 'Is valid date', value: '1' });
    this.Brules.push({ label: 'Date format should be MM/DD/YYYY', value: '2' });
    this.Brules.push({ label: 'Date format should be DD/MM/YYYY', value: '3' });
    this.Brules.push({ label: 'Data should be UPPER CASE', value: '4' });
    this.Brules.push({ label: 'Data should be LOWER CASE', value: '5' });
    this.Brules.push({ label: 'Data should be from database', value: '6' });


    this.cols = [
      { field: 'index', header: 'index', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'extractionType', header: 'Extraction Type', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'fieldname', header: 'Field Name', edit: true, hidden: false, fwidth: '20%', subfield: '' },
      { field: 'fielddata', header: 'Field Data', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'locators', header: 'Locators', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'Anchor', header: 'Anchor', edit: true, hidden: false, fwidth: '20%', subfield: 'Anchor1' },
      { field: 'bRules', header: 'Validations', edit: true, hidden: false, fwidth: '15%', subfield: '' }
    ];

    this.extractionTypes.push({ label: 'OCR', value: 'OCR' });
    this.extractionTypes.push({ label: 'OMR', value: 'OMR' });
    this.extractionTypes.push({ label: 'Signature', value: 'Signature' });


    this.Locators = [];
    this.Locators.push({ label: 'in between', value: '1' });
    this.Locators.push({ label: 'inline', value: '2' });
    this.Locators.push({ label: 'Search in next page', value: '3' });
    this.Locators.push({ label: 'Search in all pages', value: '4' });
    this.Locators.push({ label: 'table data', value: '5' });
    this.Locators.push({ label: 'Full page', value: '6' });
    this.Locators.push({ label: '1st of ½ page', value: '7' });
    this.Locators.push({ label: '2nd  of ½ page', value: '8' });
    this.Locators.push({ label: 'Top 1/3 page', value: '9' });
    this.Locators.push({ label: 'Middle 1/3 page', value: '10' });
    this.Locators.push({ label: 'Bottom 1/3 page', value: '11' });


    // this.batchName = '220170713114803';
    // this.batchID = 17295;
    // this.getBatchImages(this.batchName);

    //classify
    this.classifycols = [
      { field: 'index', header: 'index', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'minPages', header: 'Min Pages', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'maxPages', header: 'Max Pages', edit: true, hidden: false, fwidth: '20%', subfield: '' },
      { field: 'havingPageNumbers', header: 'Having Page Numbers', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'pageNumberFormat', header: 'Page Number Format', edit: true, hidden: false, fwidth: '15%', subfield: '' },
      { field: 'addIfPrevTypeisSame', header: 'Add If Prev Type Same', edit: true, hidden: false, fwidth: '20%', subfield: 'Anchor1' },
      { field: 'priority', header: 'priority', edit: true, hidden: false, fwidth: '15%', subfield: '' }
    ];
  }
  fulltextocr() {
    var imageFolderPath = this.appConfigService.getConfig('ocrImageEndPoint');
    this.convertToDataURLviaCanvas(imageFolderPath + this.currentActiveDoc.path, "image/jpeg")
      .then(base64Img => {
        //console.log(base64Img);
        let base64textString: any = base64Img;
        base64textString = base64textString.replace('data:image/jpeg;base64,', '');
        base64textString = base64textString.replace('data:image/png;base64,', '');
        //console.log(base64textString);
        const request = {
          requests: [{
            image: {
              content: base64textString
            },
            features: [{
              type: 'TEXT_DETECTION',
              maxResults: 200
            }]
          }]
        };

        this.extractionConfigService.getOcrData(request).subscribe(ocrData => {
          const ocrString = ocrData.responses.reduce((result, response) => {
            console.log(response);
            return result + response.fullTextAnnotation.text;
          }, '');
          //  console.log(ocrString);
          // this.preview = ocrString;
          //this.ocrResult.emit(ocrString);
        });
      });



  }
  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //console.log(dataURL);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
  }



  AddEmptyRow() {
    let cars = [...this.cars];
    let car = new PrimeCar();
    car.index = cars.length + 1;
    car.extractionType = "OCR";
    car.pageindex = 1;
    car.fieldname = "";
    car.fielddata = "";
    car.Anchor = "";
    car.AnchorCoordinates = "";
    car.bRules = "";
    car.docName = this.docName;
    car.docTypeName = this.docTypeName;
    car.docNameID = Number(this.docNameID);
    car.docTypeID = Number(this.docTypeID);
    car.Anchor1 = "";
    car.AnchorCoordinates1 = "";
    car.Locators = "";
    cars.push(car);
    this.cars = cars;
  }

  getSampleImages(docName: string, docTypeName: string) {
    this.batchImageService.getSampleImages(docName, docTypeName)
      .subscribe(
      batchImages => {
        //console.log(batchImages);
        this.docTypes = this.formatSampleImages(batchImages); if (this.docTypes.length > 0) {
          this.currentDocType = this.docTypes;
          this.currentActiveDoc = this.docTypes[0];
          //this.fulltextocr();
        }
      },
      error => { }
      );
  }
  getSamplegetExtractionConfigImages() {
    this.extractionConfigService.getExtractionConfig(Number(this.docTypeID))
      .subscribe(
      batchImages => {
        console.log(batchImages);
        batchImages.forEach(element => {
          let cars = [...this.cars];
          let car = new PrimeCar();
          car.index = cars.length + 1;
          car.extractionType = element.extractionType;
          car.pageindex = element.pageindex;
          car.fieldname = element.fieldName;
          car.fielddata = element.fieldDataCordinates;
          car.Anchor = element.anchor;
          car.AnchorCoordinates = element.anchorCoordinates;
          car.bRules = "";
          car.docName = this.docName;
          car.docTypeName = this.docTypeName;
          car.docNameID = Number(this.docNameID);
          car.docTypeID = Number(this.docTypeID);
          car.Anchor1 = "";
          car.AnchorCoordinates1 = "";
          car.Locators = "";
          cars.push(car);
          this.cars = cars;
        });
        this.AddEmptyRow();
      },
      error => { }
      );
  }
  onDocSelected(selectedDoc: any) {
    this.currentActiveDoc = selectedDoc;
    //console.log(this.currentActiveDoc);
  }

  formatSampleImages(batchImages: any[]) {
    return batchImages.map((image: string) => {
      return {
        docName: this.docName,
        docTypeName: this.docTypeName,
        path: image
      };
    });
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  showDialogToAdd() {
    let cars = [...this.cars];
    let car1 = new PrimeCar();
    car1.index = cars.length + 1;
    car1.extractionType = "OCR";
    car1.pageindex = 1;
    car1.fieldname = "";
    car1.fielddata = "";
    car1.Anchor = "";
    car1.AnchorCoordinates = "";
    car1.bRules = "";
    car1.docName = this.docName;
    car1.docTypeName = this.docTypeName;
    car1.docNameID = Number(this.docNameID);
    car1.docTypeID = Number(this.docTypeID);
    car1.Anchor1 = "";
    car1.AnchorCoordinates1 = "";
    car1.Locators = "";
    cars.push(car1);
    this.cars = cars;
  }

  showDialogToSave() {
    this.extractionConfigService.saveExtractionConfig(this.cars).subscribe(extractData => {
      alert('saved successfully');
    },
      error => { console.log(error); }
    );
  }

  onEditInit(event, columnname: any, rowindex: number) {
    this.fieldData = [];
    const newBatchObj = {};
    newBatchObj['index'] = rowindex;
    newBatchObj['fieldname'] = columnname;
    newBatchObj['Extractdata'] = '';
    this.fieldData.push(newBatchObj);
  }
  onEditComplete() {
    console.log(this.fieldData);
  }
  onOCRSuccess(ocrData) {
    console.log(this.fieldData);

    if (this.fieldData[0].fieldname === 'fieldname') {
      this.cars[this.fieldData[0].index].fieldname = ocrData;
    } else if (this.fieldData[0].fieldname === 'fielddata') {
      // this.cars[this.fieldData[0].index].fielddata = ocrData;
    } else if (this.fieldData[0].fieldname === 'Anchor') {
      this.cars[this.fieldData[0].index].Anchor = ocrData;
    } else if (this.fieldData[0].fieldname === 'bRules') {
      this.cars[this.fieldData[0].index].bRules = ocrData;
    } else if (this.fieldData[0].fieldname === 'Anchor1') {
      this.cars[this.fieldData[0].index].Anchor1 = ocrData;
    }
    // console.log(this.cars);
  }
  onOcrDataCordinates(ocrData) {
    if (this.fieldData[0].fieldname === 'fielddata') {
      this.cars[this.fieldData[0].index].fielddata = ocrData;
    } else if (this.fieldData[0].fieldname === 'Anchor') {
      this.cars[this.fieldData[0].index].AnchorCoordinates = ocrData;
    } else if (this.fieldData[0].fieldname === 'Anchor1') {
      this.cars[this.fieldData[0].index].AnchorCoordinates1 = ocrData;
    }
  }
  showDialog(event, rowindex) {
    console.log(event);
    console.log(rowindex);
    this.display = true;
    this.popuprowindex = rowindex;
    // this.cars[this.fieldData[0].index].bRules = this.selectedBrules;
  }
  onSubmit() {
    this.cars[this.popuprowindex].bRules = this.selectedBrules.join(',');
    console.log(this.cars);
  }

  onMultiChange(event, rowindex) {
    this.cars[rowindex].Locators = event.value;
  }

  // getBatchImages(batchName: string) {
  //   this.batchImageService.getBatchImages(batchName)
  //     .subscribe(
  //     batchImages => { this.formatBatchImages(batchImages); },
  //     error => { }
  //     );
  // }
  // formatBatchImages(imageBatches: any[]) {
  //   this.batchImageService.formatBatchImage(imageBatches, this.batchName)
  //     .subscribe(
  //     images => {
  //       this.docTypes = images; if (this.docTypes.length > 0) {
  //         this.currentDocType = this.docTypes[0];
  //         this.currentActiveDoc = this.currentDocType.pages[0];
  //       }
  //     },
  //     error => { }
  //     );
  // }

}

class PrimeCar implements Car {
  constructor(public index?, public extractionType?, public pageindex?, public fieldname?, public fielddata?, public Anchor?, public AnchorCoordinates?, public bRules?, public docName?, public docTypeName?, public docNameID?, public docTypeID?, public Anchor1?, public AnchorCoordinates1?, public Locators?) { }
}

export interface Car {
  index?: number;
  extractionType?: string;
  pageindex?: number;
  fieldname?: string;
  fielddata?: string;
  Anchor?: string;
  AnchorCoordinates?: string;
  bRules?: string;
  docName?: string;
  docTypeName?: string;
  docNameID?: number;
  docTypeID?: number;
  Anchor1?: string;
  AnchorCoordinates1?: string;
  Locators?: string;
}
