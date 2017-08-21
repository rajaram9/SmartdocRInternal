import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HelperService } from '../../core/helper-service/helper.service';


@Component({
  selector: 'si-document-side-bar',
  templateUrl: 'document-side-bar.component.html',
  styleUrls: ['document-side-bar.component.css']
})
export class DocumentSideBarComponent implements OnInit, OnChanges {
  @Input() docTypes: any[] = [];
  @Input() batchName: any = 'Documents';
  @Output() pagedrag = new EventEmitter();
  @Output() docTypeDrag = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() pdf = new EventEmitter();
  @Output() selectedDocType = new EventEmitter();
  @Output() pageSelect = new EventEmitter();
  searchKey: string;

  constructor(private helperService: HelperService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.docTypes.length > 0) {
      this.moveUnknownToFirst(this.docTypes);
    }
  }
  moveUnknownToFirst(dataSource: any[]) {
    const unknownDocs = dataSource.filter(data => {
      return data.name.toLowerCase().indexOf('unknown') !== -1 || data.name.toLowerCase().indexOf('unclassfied') !== -1;
    });
    unknownDocs.map(unknownDoc => {
      const unknownIndex = this.docTypes.indexOf(unknownDoc);
      this.docTypes.splice(unknownIndex, 1);
      this.docTypes.unshift(unknownDoc);
    });
  }
  onDrop(eventData: any) {
    this.pagedrag.emit(eventData);
  }
  onDocTypeDrop(eventData: any) {
    this.docTypeDrag.emit(eventData);
  }
  saveDocType() {
    this.save.emit();
  }
  generatePdf(pdfSection: any[]) {
    // there is no know method for check array so we check array function (concat only available in array)
    if (typeof pdfSection.concat === 'function') {
      const pdfRequest = this.getFileNameFromDocTypesArray(pdfSection);
      this.pdf.emit(pdfRequest);
    } else {
      const pdfRequest = this.getFileNameFromDocTypeObject(pdfSection);
      this.pdf.emit(pdfRequest);
    }
  }
  getFileNameFromDocTypesArray(docTypes: any[]) {
    const extn = this.helperService.getFileExtension(docTypes[0].pages[0].originalName);
    const pdfReqArray: string[] = [];
    docTypes.map((docType: any) => {
      docType.pages.map((page: any, index: number) => {
        pdfReqArray.push(`${docType.nameWithIndex}~${index + 1}.${extn}`);
      });
    });
    return pdfReqArray;
  }
  getFileNameFromDocTypeObject(docType: any) {
    const extn = this.helperService.getFileExtension(docType.pages[0].originalName);
    const pdfReqArray: string[] = [];
    docType.pages.map((page: any, index: number) => {
      pdfReqArray.push(`${docType.nameWithIndex}~${index + 1}.${extn}`);
    });
    return pdfReqArray;
  }
  addNewDocType() {
    const newDocType: any = {
      name: 'New Document',
      nameWithIndex: 'New Document',
      isClassified: true,
      isExpanded: true,
      pages: []
    };
    this.docTypes.push(newDocType);
  }
  onSelectedclick(SelectedData: any) {
    this.selectedDocType.emit(SelectedData);
  }
  onPageSelect(page) {
    this.pageSelect.emit(page);
  }

}
