import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
// import { CSVService } from ',../../core/csv-service/csv.service';
import { ConfigViewerService } from './config-viewer.service';
import { AppConfigService } from '../../app.config.service';
import { Router } from '@angular/router';
import { UploadService } from '../../core/upload-service/upload.service';

import { SelectItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ManualExtractionService } from '../../manual-extraction/manual-extraction.service';
import { BatchImageService } from '../../core/batch-image-service/batch-image.service';
import { ExtractionConfigService } from '../../extraction-config/extraction-config.service';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'si-config-viewer',
  templateUrl: 'config-viewer.component.html',
  styleUrls: ['config-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigViewerComponent implements OnInit, OnChanges {
  @Input() searchKeyword: string;
  @Input() docType = '';
  @Input() docProperty = '';
  csvdata: any = [];
  formateddata: any = [];
  selectedDocTypeSummary: any = {};
  distinctDocType: any[] = [];
  selectedDocType: any = [];
  activeIndex = 0;
  newClassificationOpen = false;
  newKeywordActive: any;
  newClassificationKeywordProperty: any = {};
  formateddata1: any;
  clickonnewdoctype = false;
  imagePath = '';
  selectedDocTypeName = '';
  Changelist: any = [];
  apiUrl: string;
  applyclickstyle = 0;

  //extraction
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

  collapsed: any = 'collapsed';

  classifycols: any[];
  classifycols1: any[];
  docTypeList: docType = new PrimedocType();
  selecteddocType: docType;
  newdocType: boolean;
  docTypeLists: docType[] = [];
  filterdocTypeLists: docType[] = [];


  classifykewordcols: any[];
  keywordTypeList: keywordType = new PrimekeywordType();
  selectedkeywordType: keywordType;
  newkeywordType: boolean;
  keywordTypeLists: keywordType[] = [];
  filterkeywordTypeLists: keywordType[] = [];

  havingPageNumbers: any = [];
  pagePosition: any = [];
  zoneArea: any = [];
  casesensitive: any = [];

  Activetabindex: Number = 0;
  msgs: Message[] = [];

  //extraction

  constructor(
    // private csvService: CSVService,
    private configViewerService: ConfigViewerService,
    private router: Router,
    private appConfigService: AppConfigService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private batchImageService: BatchImageService,
    private manualExtractionService: ManualExtractionService,
    private extractionConfigService: ExtractionConfigService
  ) { this.apiUrl = this.appConfigService.getConfig('apiUrl'); }

  ngOnInit() {
    this.imagePath = this.appConfigService.getConfig('ocrImageEndPoint1') + 'SampleFiles/';
    this.configViewerService.GetData().subscribe(
      data => {
        //console.log(this.data)
        this.formateddata = this.formartedKeyedJSON(data);
        // console.log(this.formateddata);
        this.distinctDocType = this.getDistinctDocType(this.formateddata);
        this.newClassificationOpen = true;
        this.clickonnewdoctype = false;
        this.ExtractionInit();
        //console.log(this.distinctDocType);
        //this.openDoc(this.distinctDocType[0]);
      },
      error => { }
    );
  }
  ExtractionInit() {
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

    this.havingPageNumbers.push({ label: 'Y', value: 'Y' });
    this.havingPageNumbers.push({ label: 'N', value: 'N' });

    this.pagePosition.push({ label: 'First', value: 'First' });
    this.pagePosition.push({ label: 'Last', value: 'Last' });
    this.pagePosition.push({ label: 'Addtional', value: 'Addtional' });


    this.zoneArea.push({ label: 'Full page', value: 'Fullpage' });
    this.zoneArea.push({ label: '1st of ½ page', value: 'FirstHalfofpage' });
    this.zoneArea.push({ label: '2nd  of ½ page', value: 'SecondHalfofpage' });
    this.zoneArea.push({ label: 'Left ½ page', value: 'LeftSideofpage' });
    this.zoneArea.push({ label: 'Right ½ page', value: 'RightSideofpage' });
    this.zoneArea.push({ label: 'Top 1/3 page', value: 'OneThirdofpage' });
    this.zoneArea.push({ label: 'Middle 1/3 page', value: 'SecondThirdofpage' });
    this.zoneArea.push({ label: 'Bottom 1/3 page', value: 'LastThirdofpage' });
    this.zoneArea.push({ label: '1st of ¼ page', value: 'OneFourthofpage' });
    this.zoneArea.push({ label: '2nd of ¼ page', value: 'SecondFourthofpage' });
    this.zoneArea.push({ label: '3rd of ¼ page', value: 'ThreeFouthofpage' });
    this.zoneArea.push({ label: '4th of ¼ page', value: 'LastFouthofpage' });


    this.casesensitive.push({ label: 'True', value: '1' });
    this.casesensitive.push({ label: 'False', value: '0' });



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
      { field: 'docNameID', header: 'docNameID', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'docTypeID', header: 'docTypeID', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'minPages', header: 'Min Pages', edit: true, hidden: false, fwidth: '12%', subfield: '' },
      { field: 'maxPages', header: 'Max Pages', edit: true, hidden: false, fwidth: '13%', subfield: '' },
      { field: 'havingPageNumbers', header: 'Having Page Numbers', edit: true, hidden: false, fwidth: '22%', subfield: '' },
      { field: 'pageNumberFormat', header: 'Page Number Format', edit: true, hidden: false, fwidth: '20%', subfield: '' },
      { field: 'addIfPrevTypeisSame', header: 'Add If Prev Type Same', edit: true, hidden: false, fwidth: '22%' },
      { field: 'priority', header: 'Priority', edit: true, hidden: false, fwidth: '11%', subfield: '' }
    ];

    this.classifycols1 = [
      { field: 'index', header: 'index', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'docNameID', header: 'docNameID', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'docTypeID', header: 'docTypeID', edit: true, hidden: true, fwidth: '0%', subfield: '' },
      { field: 'docTypeName', header: 'Document Type', edit: true, hidden: false, fwidth: '35%', subfield: '' },
      { field: 'fileName', header: 'Sample File', edit: true, hidden: false, fwidth: '30%', subfield: '' },
      { field: 'createddate', header: 'Last Date and Time', edit: false, hidden: false, fwidth: '20%' },
      { field: 'isdeleteddN', header: '', edit: true, hidden: false, fwidth: '5%' }
    ];

    this.classifykewordcols = [
      { field: 'index', header: 'index', edit: true, hidden: true, fwidth: '0%', subfield: '', valid: true },
      { field: 'docNameID', header: 'docNameID', edit: true, hidden: true, fwidth: '0%', subfield: '', valid: true },
      { field: 'docTypeID', header: 'docTypeID', edit: true, hidden: true, fwidth: '0%', subfield: '', valid: true },
      { field: 'keywordID', header: 'keywordID', edit: true, hidden: true, fwidth: '0%', subfield: '', valid: true },
      { field: 'keyword', header: 'Keyword', edit: true, hidden: false, fwidth: '24%', subfield: '', valid: true },
      { field: 'pagePosition', header: 'Page Position', edit: true, hidden: false, fwidth: '15%', subfield: '', valid: true },
      { field: 'percentageofsimilarity', header: '% Of Similarity', edit: true, hidden: false, fwidth: '15%', subfield: '', valid: true },
      { field: 'thresholdpercetage', header: 'Threshold %', edit: true, hidden: false, fwidth: '15%', subfield: '', valid: true },
      { field: 'zoneArea', header: 'Zone Area', edit: true, hidden: false, fwidth: '13%', valid: true },
      { field: 'casesensitive', header: 'Case Sensitive', edit: true, hidden: false, fwidth: '15%', valid: true },
      { field: 'isdeletedKy', header: '', edit: true, hidden: false, fwidth: '3%', valid: true },
      { field: 'keywordvalid', header: '', edit: true, hidden: true, fwidth: '', valid: true }
    ];
  }
  ngOnChanges() {
    if (this.searchKeyword) {
      this.formateddata1 = Object.keys(this.formateddata).filter((value: any) => {
        return value.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) !== -1;
      });
      this.openDoc(this.formateddata1[0]);
    } else {
      if (this.distinctDocType.length > 0) {
        this.openDoc(this.distinctDocType[0]);
      }
    }
  }
  fileChange(event, docName, docTypeName) {
    //this.files = event.srcElement.files;
    const files = event.target.files;
    // if (this.newClassification.docTypeName === '') {
    //   alert('please enter document type');
    // }
    const uploadUrl = `${this.apiUrl}api/uploadSampleFile`;
    this.uploadService.uploadFilesToServer(files, uploadUrl, docName, docTypeName).subscribe(
      successResponse => {
        const response = successResponse;
        const docindex = this.formateddata[docName].docTypeName.findIndex(i => i.docTypeName === docTypeName);
        this.formateddata[docName].docTypeName[docindex].fileName = response;
        let ModifiedChangeList: any = {};
        ModifiedChangeList.docName = docName;
        ModifiedChangeList.docTypeName = docTypeName;
        ModifiedChangeList.changeproperty = 'fileName';
        ModifiedChangeList.newvalue = response;
        ModifiedChangeList.oldValue = '';
        ModifiedChangeList.Ind = 'Modified';
        ModifiedChangeList.Changeitem = 'docTypeName';
        this.Changelist.push(ModifiedChangeList);
        // event.fileName = response;
        //this.newBatch.emit(response);
      }
    );
  }

  getDistinctDocType(csvdata: any) {
    return Object.keys(csvdata);
  }
  openDoc(docType: string) {
    // setTimeout(() => {
    this.selectedDocType = this.formateddata[docType];
    this.selectedDocTypeName = '';
    this.applyclickstyle = 1;
    this.newClassificationOpen = true;
    this.clickonnewdoctype = true;
    // }, 1000);
    this.docName = this.selectedDocType.docName;
    // this.docTypeName = this.selectedDocType.docTypeName[0].docTypeName;
    // this.docNameID = this.selectedDocType.docNameID;
    // this.docTypeID = this.selectedDocType.docTypeName[0].cst_DocTypeID;
    // this.getSampleImages(this.docName, this.docTypeName);
    // this.getSamplegetExtractionConfigImages();

  }
  openDocType(index: number, docType: string) {
    this.selectedDocTypeName = this.formateddata[docType].docTypeName[index].docTypeName;
    this.selectedDocType = this.formateddata[docType];
    this.newClassificationOpen = false;
    this.clickonnewdoctype = false;
    this.cars = [];
    this.docName = this.selectedDocType.docName;
    this.docTypeName = this.selectedDocTypeName;
    this.docNameID = this.selectedDocType.docNameID;
    this.docTypeID = this.formateddata[docType].docTypeName[index].cst_DocTypeID;
    this.getSampleImages(this.docName, this.docTypeName);
    if (this.docTypeID != undefined) {
      this.getSamplegetExtractionConfigImages();
      this.filterdocTypeLists = this.docTypeLists.filter(i => (i.docTypeID === Number(this.docTypeID)));
      this.filterkeywordTypeLists = this.keywordTypeLists.filter(i => (i.docTypeID === Number(this.docTypeID)));
    }
  }
  movetoExtraction(data: any, index: number) {
    this.router.navigate(['extractionConfig'], {
      queryParams: {
        docName: data.docName,
        docTypeName: data.docTypeName,
        docNameID: data.docNameID,
        docTypeID: data.docTypeID
      }
    });
  }
  removeDocTypeName(data: any, index: number) {
    // console.log(data);
    //console.log(this.formateddata[data.docName].docTypeName[index]);

    this.formateddata[data.docName].docTypeName[index].isdeleteddN = true;
    // setTimeout(() => {
    this.distinctDocType = [];
    this.distinctDocType = this.getDistinctDocType(this.formateddata);
    this.selectedDocType = this.formateddata[data.docName];
    let docindex = this.distinctDocType.findIndex(i => i === data.docName);
    // this.searchKeyword=data.docName;

    this.openDoc(this.distinctDocType[docindex]);
    // console.log(this.selectedDocType);
    // console.log(this.formateddata[data.docName].docTypeName[index]);
    // }, 2000);
  }
  removeKeyword(data: any, docindex: number, keywordindex: number) {
    console.log(data);
    docindex = this.formateddata[data.docName].docTypeName.findIndex(i => i.docTypeName === data.docTypeName);
    keywordindex = this.formateddata[data.docName].docTypeName[docindex].keywords.findIndex(i => i.keyword === data.keyword);
    //docindex = this.formateddata[data.docName].findindex(v => v.docTypeName = data.docTypeName);
    this.formateddata[data.docName].docTypeName[docindex].keywords[keywordindex].isdeletedKy = true;
    this.selectedDocType = this.formateddata[data.docName];
    console.log(docindex);
  }
  showError(msg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }
  showDialogToclassifySave() {
    console.log(this.Changelist);
    let ModifiedChangeList: any[] = this.Changelist;
    // this.filterkeywordTypeLists.
    let Matchekeywordlist: any[] = [];
    let index: any[] = [];
    let duplicatecount: number = 0;
    this.keywordTypeLists.filter(
      function (val) {

        for (var i = 0; i < Object.keys(ModifiedChangeList).length; i++) {
          if (val.keyword == ModifiedChangeList[i].newvalue && val.docName == ModifiedChangeList[i].docName && val.docTypeName == ModifiedChangeList[i].docTypeName) {
            if (index.findIndex(i => i.keyword == val.keyword) == -1) {
              let duplicatelist: any = {}
              duplicatelist.docName = val.docName;
              duplicatelist.docTypeName = val.docTypeName;
              duplicatelist.keyword = val.keyword;
              duplicatelist.count = 1;
              index.push(duplicatelist);
            }
            else {
              index[index.findIndex(i => i.keyword == val.keyword)].count = index[index.findIndex(i => i.keyword == val.keyword)].count + 1;
            }
          }
          if (val.keyword == ModifiedChangeList[i].newvalue && val.docName != ModifiedChangeList[i].docName && val.docTypeName != ModifiedChangeList[i].docTypeName) {
            let keywordslist: any = {}
            keywordslist.docName = val.docName;
            keywordslist.docTypeName = val.docTypeName;
            keywordslist.keyword = val.keyword;
            keywordslist.count = 1;
            Matchekeywordlist.push(keywordslist);
          }
        }
      }
    );
    var errormsg = "";
    if (index.length > 0) {
      for (var j = 0; j < Object.keys(this.filterkeywordTypeLists).length; j++) {
        this.filterkeywordTypeLists[j].keywordvalid = true;
        this.filterkeywordTypeLists[j].keywordinvalidMsg = "";
        for (var i = 0; i < Object.keys(index).length; i++) {
          if (index[i].count > 1) {
            this.filterkeywordTypeLists[j].keywordvalid = false;
            this.filterkeywordTypeLists[j].keywordinvalidMsg = 'Matching with keyword in<br> Doc Name:' + this.filterkeywordTypeLists[j].docName + ' <br> Doc Type Name:' + this.filterkeywordTypeLists[j].docTypeName;;
          }
        }
      }
    }

    if (Matchekeywordlist.length > 0) {
      for (var j = 0; j < Object.keys(this.filterkeywordTypeLists).length; j++) {
        this.filterkeywordTypeLists[j].keywordvalid = true;
        this.filterkeywordTypeLists[j].keywordinvalidMsg = "";
        for (var i = 0; i < Object.keys(Matchekeywordlist).length; i++) {
          if (this.filterkeywordTypeLists[j].keyword == Matchekeywordlist[i].keyword) {
            this.filterkeywordTypeLists[j].keywordvalid = false;
            this.filterkeywordTypeLists[j].keywordinvalidMsg = 'Matching with keyword in<br> Doc Name:' + Matchekeywordlist[i].docName + ' <br> Doc Type Name:' + Matchekeywordlist[i].docTypeName;;
          }
        }
      }
    }
    this.msgs = [];
    if (this.filterkeywordTypeLists.findIndex(i => i.keywordvalid == false) > -1) {
      this.showError("Duplicate keywords");
    }

    // this.configViewerService.saveData(this.Changelist).subscribe(
    //   data => { alert('saved successfully'); },
    //   error => { }
    // );
  }
  onDocTypeChange(changeData: any) {
    this.formateddata.map((csvRow: any) => {
      if (csvRow.docTypeName === changeData.oldValue) {
        csvRow.docTypeName = changeData.newValue;
      }
    });
  }
  onDocSummaryChange(changeData: any, docName: string) {
    //let doctype=this.selectedDocType;
    if (this.formateddata[docName].docTypeName.some(x => x.docTypeName === changeData.docType)) {
      var index = this.formateddata[docName].docTypeName.findIndex(i => i.docTypeName === changeData.docType)
      this.formateddata[docName].docTypeName[index][changeData.property] = changeData.newValue;
      this.formateddata[docName].docTypeName[index]['Ind'] = 'Modified';
      var cindex = this.Changelist.findIndex(x => (x.docName === docName) && (x.docTypeName == changeData.docType))
      if (cindex != -1) {
        this.Changelist.splice(cindex, 1);
      }
      let ModifiedChangeList: any = {};
      ModifiedChangeList.docName = docName;
      ModifiedChangeList.docTypeName = this.formateddata[docName].docTypeName[index].docTypeName;
      ModifiedChangeList.changeproperty = changeData.property;
      ModifiedChangeList.newvalue = changeData.newValue;
      ModifiedChangeList.oldValue = changeData.oldValue;
      ModifiedChangeList.Ind = 'Modified';
      ModifiedChangeList.Changeitem = 'docTypeName';
      this.Changelist.push(ModifiedChangeList);
    }
    this.distinctDocType = [];
    this.distinctDocType = this.getDistinctDocType(this.formateddata);
  }
  onDocKeywordChange(changeData: any, docName: string, docTypeName: string) {
    if (this.formateddata[docName].docTypeName.some(x => x.docTypeName === docTypeName)) {
      var index = this.formateddata[docName].docTypeName.findIndex(i => i.docTypeName === docTypeName)
      var kindex = this.formateddata[docName].docTypeName[index].keywords.findIndex(i => i.keyword === changeData.docType)
      this.formateddata[docName].docTypeName[index].keywords[kindex][changeData.property] = changeData.newValue;
      this.formateddata[docName].docTypeName[index]['Ind'] = 'Modified';
      let ModifiedChangeList: any = {};
      ModifiedChangeList.docName = docName;
      ModifiedChangeList.docTypeName = this.formateddata[docName].docTypeName[index].docTypeName;
      ModifiedChangeList.changeproperty = changeData.property;
      ModifiedChangeList.newvalue = changeData.newValue;
      ModifiedChangeList.oldValue = changeData.oldValue;
      ModifiedChangeList.Ind = 'Modified';
      ModifiedChangeList.Changeitem = 'Keyword';
      this.Changelist.push(ModifiedChangeList);
    }
    this.distinctDocType = [];
    this.distinctDocType = this.getDistinctDocType(this.formateddata);
  }
  openNewClassification() {
    this.newClassificationOpen = true;
    this.clickonnewdoctype = false;
    this.selectedDocType = '';
    this.selectedDocTypeName = '';
  }
  openNewDocType() {
    this.newClassificationOpen = true;
    this.clickonnewdoctype = true;
    // this.selectedDocType = '';
    // this.selectedDocTypeName = '';
    // console.log(this.csvdata)
  }

  closeNewKeywordpanel(event: any) {
    this.newKeywordActive = false;
    event.stopPropagation();
  }
  onNewClassificationCreate(newClassificationData: any) {
    //this.formateddata.push(newClassificationData);
    //this.searchKeyword=newClassificationData.DocName;
    //console.log(newClassificationData.docTypeName);
    if (newClassificationData.docTypeName.length == 0) {
      // console.log(this.formateddata.length);
      // this.formateddata = Object.keys(this.formateddata).push(newClassificationData);
      this.formateddata[newClassificationData.docName] = {};
      this.formateddata[newClassificationData.docName].docName = newClassificationData.docName;
      this.formateddata[newClassificationData.docName].Ind = 'added';
      this.formateddata[newClassificationData.docName].docTypeName = [];
      let newChangeList: any = {};
      newChangeList.docName = newClassificationData.docName;
      newChangeList.Changeitem = 'docName';
      newChangeList.Ind = 'added';
      newChangeList.isdeleted = false;
      this.Changelist.push(newChangeList);
      // this.distinctDocType = this.getDistinctDocType(this.formateddata);
      // this.openDoc(newClassificationData.docName);
    } else {
      newClassificationData.Ind = 'added';
      newClassificationData.Changeitem = 'docTypeName';
      newClassificationData.isdeleteddN = false;
      this.Changelist.push(newClassificationData);
      this.formateddata[newClassificationData.docName].docTypeName.push(newClassificationData);
      this.getSampleImages(newClassificationData.docName, newClassificationData.docTypeName);
      setTimeout(() => {
        let docTypeLists = [...this.docTypeLists];
        let doctype1 = new PrimedocType();
        doctype1.index = docTypeLists.length + 1;
        doctype1.maxPages = this.currentDocType.length;
        doctype1.minPages = this.currentDocType.length;
        doctype1.pageNumberFormat = "";
        doctype1.addIfPrevTypeisSame = "";
        doctype1.havingPageNumbers = "";
        doctype1.priority = "";
        doctype1.docName = newClassificationData.docName;
        doctype1.docTypeName = newClassificationData.docTypeName;
        doctype1.docNameID = 0;
        doctype1.docTypeID = 0;
        doctype1.fileName = newClassificationData.fileName;
        doctype1.createddate = "";
        doctype1.isdeleteddN = false;
        docTypeLists.push(doctype1);
        this.docTypeLists = docTypeLists;

        let keywordTypeLists = [...this.keywordTypeLists];
        let keywordType1 = new PrimekeywordType();
        keywordType1.index = keywordTypeLists.length + 1;
        keywordType1.casesensitive = "";
        keywordType1.docName = newClassificationData.docName;
        keywordType1.docTypeName = newClassificationData.docTypeName;
        keywordType1.keyword = "";
        keywordType1.pagePosition = "";
        keywordType1.percentageofsimilarity = "";
        keywordType1.thresholdpercetage = "";
        keywordType1.zoneArea = "";
        keywordType1.isdeletedKy = false;
        keywordType1.keywordID = 0;
        keywordType1.docNameID = 0;
        keywordType1.docTypeID = 0;
        keywordType1.keywordvalid = true;
        keywordType1.keywordinvalidMsg = "";
        keywordTypeLists.push(keywordType1);
        this.keywordTypeLists = keywordTypeLists;

        this.filterdocTypeLists = this.docTypeLists.filter(i => (i.docTypeName === newClassificationData.docTypeName));
        this.filterkeywordTypeLists = this.keywordTypeLists.filter(i => (i.docTypeName === newClassificationData.docTypeName));
      }, 100);
    }
    //console.log(this.formateddata);
    this.distinctDocType = this.getDistinctDocType(this.formateddata);
    this.selectedDocType = this.formateddata[newClassificationData.docName];
    //this.openDoc(newClassificationData.docName);
    //console.log(this.distinctDocType);
    //this.openDoc(this.distinctDocType[0]);
    // this.csvdata.push(newClassificationData);
    // this.getDistinctDocType(this.csvdata);
  }
  addNewKeyword(selectedDocTypes: any) {
    let newObj: any = {};
    var index = selectedDocTypes.docTypeName.findIndex(i => i.docTypeName === this.newClassificationKeywordProperty.docTypeName.docTypeName)
    if (selectedDocTypes.docTypeName[index].keywords) {
      newObj = {};// Object.assign({}, selectedDocTypes);
      newObj.keyword = this.newClassificationKeywordProperty.keyword;
      newObj.percentageofsimilarity = this.newClassificationKeywordProperty.percentageofsimilarity;
      newObj.keywordThresholdpercetage = this.newClassificationKeywordProperty.keywordThresholdpercetage;
      newObj.zoneArea = this.newClassificationKeywordProperty.zoneArea;
      newObj.pagePosition = this.newClassificationKeywordProperty.pagePosition;
      newObj.casesensitive = this.newClassificationKeywordProperty.casesensitive;
      newObj.Ind = 'added';
      newObj.Changeitem = 'keyword';
      newObj.isdeletedKy = false;
      newObj.docName = selectedDocTypes.docName;
      newObj.docTypeName = this.newClassificationKeywordProperty.docTypeName.docTypeName;
      this.Changelist.push(newObj);
      this.formateddata[selectedDocTypes.docName].docTypeName[index].keywords.push(newObj);
      //this.selectedDocType.docTypeName[index].keywords.push(newObj);
      this.distinctDocType = this.getDistinctDocType(this.formateddata);
      this.selectedDocType = this.formateddata[selectedDocTypes.docName];
      //
    }

    this.newClassificationKeywordProperty = {};
  }
  onsearch(keyword: string) {
    this.searchKeyword = keyword;
  }


  formartedKeyedJSON(data) {
    return data.reduce((obj, ele) => {
      if (!obj[ele.docName]) {
        obj[ele.docName] = {};
        obj[ele.docName].docName = ele.docName;
        obj[ele.docName].docNameID = ele.cst_DocNameID;
        ele.isdeleted = false;
        ele.Ind = 'IntialLoad';
        obj[ele.docName].docTypeName = [];
      }

      if (!obj[ele.docName].docTypeName.some(x => x.docTypeName === ele.docTypeName)) {
        ele.isdeleteddN = false;
        ele.Ind = 'IntialLoad';
        ele.docTypeID = ele.cst_DocTypeID;
        ele.keywords = [];
        delete ele.isdeleted;
        // delete ele.keywords;
        obj[ele.docName].docTypeName.push(ele);

        let docTypeLists = [...this.docTypeLists];
        let doctype1 = new PrimedocType();
        doctype1.index = docTypeLists.length + 1;
        doctype1.maxPages = ele.maxPages;
        doctype1.minPages = ele.minPages;
        doctype1.pageNumberFormat = ele.pageNumberFormat;
        doctype1.addIfPrevTypeisSame = ele.addIfPrevTypeisSame;
        doctype1.havingPageNumbers = ele.havingPageNumbers;
        doctype1.priority = ele.priority;
        doctype1.docName = ele.docName;
        doctype1.docTypeName = ele.docTypeName;
        doctype1.docNameID = Number(ele.cst_DocNameID);
        doctype1.docTypeID = Number(ele.cst_DocTypeID);
        doctype1.fileName = ele.fileName;
        doctype1.createddate = "";
        doctype1.isdeleteddN = false;
        docTypeLists.push(doctype1);
        this.docTypeLists = docTypeLists;

        let keywords: any = [];
        keywords.Ind = 'IntialLoad';
        keywords.casesensitive = ele.casesensitive;
        keywords.docName = ele.docName;
        keywords.docTypeName = ele.docTypeName;
        keywords.keyword = ele.keyword;
        keywords.pagePosition = ele.pagePosition;
        keywords.percentageofsimilarity = ele.percentageofsimilarity;
        keywords.thresholdpercetage = ele.thresholdpercetage;
        keywords.zoneArea = ele.zoneArea;
        keywords.isdeletedKy = false;
        keywords.keywordID = ele.cst_KeywordID;

        let keywordTypeLists = [...this.keywordTypeLists];
        let keywordType1 = new PrimekeywordType();
        keywordType1.index = keywordTypeLists.length + 1;
        keywordType1.casesensitive = ele.casesensitive;
        keywordType1.docName = ele.docName;
        keywordType1.docTypeName = ele.docTypeName;
        keywordType1.keyword = ele.keyword;
        keywordType1.pagePosition = ele.pagePosition;
        keywordType1.percentageofsimilarity = ele.percentageofsimilarity;
        keywordType1.thresholdpercetage = ele.thresholdpercetage;
        keywordType1.zoneArea = ele.zoneArea;
        keywordType1.isdeletedKy = false;
        keywordType1.keywordID = ele.cst_KeywordID;
        keywordType1.docNameID = Number(ele.cst_DocNameID);
        keywordType1.docTypeID = Number(ele.cst_DocTypeID);
        keywordType1.keywordvalid = true;
        keywordType1.keywordinvalidMsg = "";
        keywordTypeLists.push(keywordType1);
        this.keywordTypeLists = keywordTypeLists;
        // var len = Object.keys(obj[ele.docName].docTypeName).length;
        // var stn=stn1;
        // ele.isdeletedKy = false;
        // delete ele.isdeleteddN;
        obj[ele.docName].docTypeName[0].keywords.push(keywords);
      }
      else {
        // var index= obj[ele.docName].docTypeName.indexOf(x => x.docTypeName === ele.docTypeName);
        var len = Object.keys(obj[ele.docName].docTypeName).length;
        var index = obj[ele.docName].docTypeName.findIndex(i => i.docTypeName === ele.docTypeName);

        // delete ele.isdeleted;
        // delete ele.isdeleteddN;
        // delete ele.keywords;
        ele.isdeletedKy = false;
        ele.Ind = 'IntialLoad';
        ele.keywordID = ele.cst_KeywordID;
        obj[ele.docName].docTypeName[index].keywords.push(ele);

        let keywordTypeLists = [...this.keywordTypeLists];
        let keywordType1 = new PrimekeywordType();
        keywordType1.index = keywordTypeLists.length + 1;
        keywordType1.casesensitive = ele.casesensitive;
        keywordType1.docName = ele.docName;
        keywordType1.docTypeName = ele.docTypeName;
        keywordType1.keyword = ele.keyword;
        keywordType1.pagePosition = ele.pagePosition;
        keywordType1.percentageofsimilarity = ele.percentageofsimilarity;
        keywordType1.thresholdpercetage = ele.thresholdpercetage;
        keywordType1.zoneArea = ele.zoneArea;
        keywordType1.isdeletedKy = false;
        keywordType1.keywordID = ele.cst_KeywordID;
        keywordType1.docNameID = Number(ele.cst_DocNameID);
        keywordType1.docTypeID = Number(ele.cst_DocTypeID);
        keywordType1.keywordvalid = true;
        keywordType1.keywordinvalidMsg = "";
        keywordTypeLists.push(keywordType1);
        this.keywordTypeLists = keywordTypeLists;
      }

      return obj;
    }, {});
  }

  showDialogTokeywordAdd() {
    let keywordTypeLists = [...this.keywordTypeLists];
    let keywordType1 = new PrimekeywordType();
    keywordType1.index = keywordTypeLists.length + 1;
    keywordType1.casesensitive = "";
    keywordType1.docName = this.docName;
    keywordType1.docTypeName = this.docTypeName;
    keywordType1.keyword = "";
    keywordType1.pagePosition = "";
    keywordType1.percentageofsimilarity = "";
    keywordType1.thresholdpercetage = "";
    keywordType1.zoneArea = "";
    keywordType1.isdeletedKy = false;
    keywordType1.keywordID = 0;
    keywordType1.docNameID = Number(this.docNameID);
    keywordType1.docTypeID = Number(this.docTypeID);
    keywordType1.keywordvalid = true;
    keywordType1.keywordinvalidMsg = "";
    keywordTypeLists.push(keywordType1);
    this.keywordTypeLists = keywordTypeLists;
    this.filterkeywordTypeLists = this.keywordTypeLists.filter(i => (i.docTypeName === this.docTypeName));
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

  // handleChange(e) {
  //   this.Activetabindex = e.index;
  // }



  onEditInit(event, columnname: any, rowindex: number) {
    this.fieldData = [];
    const newBatchObj = {};
    newBatchObj['index'] = rowindex;
    newBatchObj['fieldname'] = columnname;
    newBatchObj['Extractdata'] = '';
    newBatchObj['from'] = 'extraction';
    newBatchObj['initdata'] = '';
    this.fieldData.push(newBatchObj);
  }

  ondocTypeEditInit(event, columnname: any, rowindex: number) {
    this.fieldData = [];
    const newBatchObj = {};
    newBatchObj['index'] = rowindex;
    newBatchObj['fieldname'] = columnname;
    newBatchObj['Extractdata'] = '';
    newBatchObj['from'] = 'classifydoctype';
    newBatchObj['initdata'] = '';
    this.fieldData.push(newBatchObj);
  }
  onkeywordTypeEditInit(event, columnname: any, rowindex: number, initdata: any) {
    this.fieldData = [];
    const newBatchObj = {};
    newBatchObj['index'] = rowindex;
    newBatchObj['fieldname'] = columnname;
    newBatchObj['Extractdata'] = '';
    newBatchObj['from'] = 'classifykeywordtype';
    newBatchObj['initdata'] = initdata;
    this.fieldData.push(newBatchObj);
  }
  onEditComplete(event, columnname: any, rowindex: number) {
    var cindex = this.Changelist.findIndex(x => (x.docName === this.docName) && (x.docTypeName == this.docTypeName) && (x.changeindex == rowindex) && (x.changeproperty == columnname) && (x.Changeitem == 'Keyword'))
    if (cindex != -1) {
      this.Changelist.splice(cindex, 1);
    }
    let ModifiedChangeList: any = {};
    ModifiedChangeList.docName = this.docName;
    ModifiedChangeList.docTypeName = this.docTypeName;
    ModifiedChangeList.changeproperty = columnname;
    ModifiedChangeList.newvalue = (columnname == 'dropdown') ? event.value : event.currentTarget.value;
    ModifiedChangeList.oldValue = (columnname == 'dropdown') ? event.value : this.fieldData[0].initdata;
    ModifiedChangeList.Ind = 'Modified';
    ModifiedChangeList.Changeitem = 'Keyword';
    ModifiedChangeList.changeindex = rowindex;
    this.Changelist.push(ModifiedChangeList);
    console.log(this.Changelist);
  }
  onSpinnerInit(event, columnname: any, rowindex: number, value: any) {
    var cindex = this.Changelist.findIndex(x => (x.docName === this.docName) && (x.docTypeName == this.docTypeName) && (x.changeindex == rowindex) && (x.changeproperty == columnname) && (x.Changeitem == 'Keyword'))
    if (cindex != -1) {
      this.Changelist.splice(cindex, 1);
    }
    let ModifiedChangeList: any = {};
    ModifiedChangeList.docName = this.docName;
    ModifiedChangeList.docTypeName = this.docTypeName;
    ModifiedChangeList.changeproperty = columnname;
    ModifiedChangeList.newvalue = value;
    ModifiedChangeList.oldValue = value;
    ModifiedChangeList.Ind = 'Modified';
    ModifiedChangeList.Changeitem = 'Keyword';
    ModifiedChangeList.changeindex = rowindex;
    this.Changelist.push(ModifiedChangeList);
    //console.log(this.Changelist);
  }

  handleChange(event, columnname: any, rowindex: number) {
    if (columnname == undefined) {
      this.Activetabindex = event.index;
    }
    else {
      var cindex = this.Changelist.findIndex(x => (x.docName === this.docName) && (x.docTypeName == this.docTypeName) && (x.changeindex == rowindex) && (x.changeproperty == columnname) && (x.Changeitem == 'Keyword'))
      if (cindex != -1) {
        this.Changelist.splice(cindex, 1);
      }
      let ModifiedChangeList: any = {};
      ModifiedChangeList.docName = this.docName;
      ModifiedChangeList.docTypeName = this.docTypeName;
      ModifiedChangeList.changeproperty = columnname;
      ModifiedChangeList.newvalue = event.target.value;
      ModifiedChangeList.oldValue = event.target.value;
      ModifiedChangeList.Ind = 'Modified';
      ModifiedChangeList.Changeitem = 'Keyword';
      ModifiedChangeList.changeindex = rowindex;
      this.Changelist.push(ModifiedChangeList);
      //console.log(this.Changelist);
    }
  }
  onOCRSuccess(ocrData) {
    console.log(this.fieldData);
    if (this.fieldData[0].from === 'extraction') {
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
    } else if (this.fieldData[0].from === 'classifydoctype') {
      if (this.fieldData[0].fieldname === 'docTypeName') {
        this.filterdocTypeLists[this.fieldData[0].index].docTypeName = ocrData;
      }
    } else if (this.fieldData[0].from === 'classifykeywordtype') {
      if (this.fieldData[0].fieldname === 'keyword') {
        this.filterkeywordTypeLists[this.fieldData[0].index].keyword = ocrData;
      }
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

export interface docType {
  index?: number;
  minPages?: string;
  maxPages?: number;
  havingPageNumbers?: string;
  pageNumberFormat?: string;
  addIfPrevTypeisSame?: string;
  priority?: string;
  docName?: string;
  docTypeName?: string;
  docNameID?: number;
  docTypeID?: number;
  fileName?: string;
  createddate?: string;
  isdeleteddN?: Boolean;
}

class PrimedocType implements docType {
  constructor(public index?, public minPages?, public maxPages?, public havingPageNumbers?, public pageNumberFormat?, public addIfPrevTypeisSame?, public priority?, public docName?, public docTypeName?, public docNameID?, public docTypeID?, public fileName?, public createddate?, public isdeleteddN?) { }
}

export interface keywordType {
  index?: number;
  keyword?: number;
  pagePosition?: string;
  percentageofsimilarity?: string;
  thresholdpercetage?: string;
  zoneArea?: string;
  isdeletedKy?: Boolean;
  keywordID?: Number;
  casesensitive?: string;
  docName?: string;
  docTypeName?: string;
  docNameID?: number;
  docTypeID?: number;
  keywordvalid?: Boolean;
  keywordinvalidMsg?: string;
}

class PrimekeywordType implements keywordType {
  constructor(public index?, public keyword?, public pagePosition?, public percentageofsimilarity?, public thresholdpercetage?, public zoneArea?, public isdeletedKy?, public keywordID?, public casesensitive?, public docName?, public docTypeName?, public docNameID?, public docTypeID?, public keywordvalid?, public keywordinvalidMsg?) { }
}






