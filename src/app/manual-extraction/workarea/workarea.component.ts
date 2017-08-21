import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ManualExtractionService } from '../manual-extraction.service';
import { ExtractionData } from '../../interfaces/ExtractionData';

@Component({
  selector: 'si-extraction-workarea',
  templateUrl: 'workarea.component.html',
  styleUrls: ['workarea.component.scss']
})
export class ManualExtractionWorkareaComponent implements OnInit, OnChanges {
  @Input() docTypes: any[] = [];
  @Input() batchData: any[] = [];
  @Input() batchID: number;
  selectedDocType: any;
  currentDocType: any = [];
  currentBatchData: any = [];
  fieldData: string;
  private currentdocTypeIndex = new Subject<number>();
  currentdocTypeIndex$ = this.currentdocTypeIndex.asObservable();

  activeNavItem = 'doc';
  extractedFields: any[] = [];
  currentActiveDoc: any;
  collapsed = false;

  constructor(private manualExtractionService: ManualExtractionService) {
    //console.log(this.selectedDocType);
  }

  onNavItemChanged(selectedNav: string) {
    this.activeNavItem = selectedNav;
  }
  onDocSelected(selectedDoc: any) {
    this.currentActiveDoc = selectedDoc;
    //console.log(this.currentActiveDoc);
  }
  fieldSelect(selectedData) {
    this.fieldData = selectedData;
    const selectedfieldinimage = selectedData.Pageindex;
    this.currentActiveDoc = this.currentDocType.pages[selectedfieldinimage];
  }
  fieldValueChange() {
  }
  onsearch(keyword: any) {
    this.selectedDocType = keyword;
    // var searchTerm = "stevie";
    let index = -1;
    let docindex = -1;
    let k = 0;
    for (k = 0; k < this.batchData.length; k++) {

      if (this.batchData[k].batchpath.toUpperCase().replace('.PDF', '') === this.selectedDocType.toUpperCase().replace('.PDF', '')) {

        index = k;
        break;
      }
    }
    for (k = 0; k < this.docTypes.length; k++) {
      if (this.docTypes[k].nameWithIndex.toUpperCase() === this.selectedDocType.toUpperCase()) {
        docindex = k;
        break;
      }
    }
    this.currentDocType = this.docTypes[docindex];
    this.currentActiveDoc = this.currentDocType.pages[0];

    if (index !== -1) {
      const documenttypeName = this.batchData[index].documenttypeName;
      // if(this.currentDocType==this.batchData[index].)
      if (documenttypeName.toUpperCase() === this.currentDocType.name.toUpperCase()) {
        let jsonString = this.batchData[index].jsonString;
        //jsonString = JSON.stringify(jsonString).replace(/[\n]/g, '\\\\n');
        jsonString = jsonString.replace(/\\n/g, "\\n")
          .replace(/\\'/g, "\\'")
          .replace(/\\"/g, '\\"')
          .replace(/\\&/g, "\\&")
          .replace(/\\r/g, "\\r")
          .replace(/\\t/g, "\\t")
          .replace(/\\b/g, "\\b")
          .replace(/\\f/g, "\\f");
        //  remove non-printable and other non-valid JSON chars
        jsonString = jsonString.replace(/[\u0000-\u0019]+/g, "");
        ////jsonString = jsonString.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t")
        this.currentBatchData = JSON.parse(jsonString);
        //console.log(this.currentBatchData);
      }

    } else {
      this.currentBatchData = [];
    }
    // let ind1= this.batchData.findIndex(this.selectedDocType);
  }
  onSave() {
    // console.log(JSON.stringify(this.currentBatchData));
    // console.log(this.currentDocType);
    // console.log(this.currentActiveDoc);
    // console.log(this.currentBatchData);
    // console.log(this.batchID);
    // console.log(this.currentActiveDoc.displayName);
    const fieldDatas: ExtractionData[] = <ExtractionData[]>[];
    const fieldData: ExtractionData = <ExtractionData>{};
    fieldData.batchid = this.batchID;
    fieldData.Batchpath = this.currentActiveDoc.groupName + '.pdf';
    fieldData.JsonString = JSON.stringify(this.currentBatchData);
    fieldDatas.push(fieldData);
    let k = 0;
    for (k = 0; k < this.batchData.length; k++) {
      if (this.batchData[k].batchpath.toUpperCase() === this.currentActiveDoc.groupName.toUpperCase() + '.PDF') {
        this.batchData[k].jsonString = JSON.stringify(this.currentBatchData);
        break;
      }
    }
    //console.log(fieldDatas);
    this.saveExtractedData(fieldDatas);
  }
  onPdfRequest() { }

  // life cycle hook
  ngOnInit() {
    this.currentdocTypeIndex$.subscribe((index: number) => {
      this.currentDocType = this.docTypes[index];
      this.currentActiveDoc = this.currentDocType.pages[0];
      this.onsearch(this.currentActiveDoc.groupName);
      //console.log(this.currentDocType.pages[0]);
      //console.log(this.batchData);
      //const documenttypeName = this.batchData[index].documenttypeName;
      // if(this.currentDocType==this.batchData[index].)
      // if (documenttypeName.toUpperCase().replace('.PDF', '') === this.currentDocType.name.toUpperCase().replace('.PDF', '')) {
      //   const jsonString = this.batchData[index].jsonString;
      //   this.currentBatchData = JSON.parse(jsonString);
      // }
      // console.log(this.currentDocType);
    });
  }

  ngOnChanges() {
    // console.log(this.selectedDocType);
    if (this.docTypes.length > 0 && this.batchData.length > 0) {
      this.currentdocTypeIndex.next(0);
    }
  }
  saveExtractedData(currentBatchData: any[]) {
    this.manualExtractionService.saveExtractionChanges(currentBatchData).subscribe(extractData => {
      alert('saved successfully');
    },
      error => { console.log(error); }
    );
  }

}

