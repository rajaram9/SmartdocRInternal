import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HelperService } from '../../core/helper-service/helper.service';

@Component({
  selector: 'si-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
})
export class GridTableComponent implements OnInit, OnChanges {
  @Input() gridHeaders: any[] = [];
  @Input() gridData: any[] = [];
  @Output() classification = new EventEmitter();
  @Output() extraction = new EventEmitter();
  activeColumn = -1;
  mouseOverColumn = -1;
  columnWidth = 10;

  constructor(private helperService: HelperService) {
    this.setColumnWidth(this.gridHeaders);
  }

  ngOnInit() {

  }
  addRowToGrid(rowData: any[]) {
    // this.gridData = this.gridData.concat(rowData);
    this.gridData = rowData;
  }
  openColumnTools(index: number) {
    if (this.activeColumn === index) {
      this.activeColumn = -1;
    } else {
      this.activeColumn = index;
    }
  }
  addMouseOver(index: number) {
    if (this.activeColumn !== index) {
      this.activeColumn = -1;
    }
    this.mouseOverColumn = index;
  }
  removeMouseOver(index: number) {
    if (this.activeColumn !== index) {
      this.mouseOverColumn = -1;
    }
  }
  setColumnWidth(gridHeaders: string[]) {
    this.columnWidth = 100 / this.gridHeaders.length;
  }
  getDistinctValueOfProperty(array: any[], prop: string) {
    console.log('grid  distinct value');
    const distinctValueArray = this.helperService.getDistinctValueOfProperty(array, prop);
    const formatedDistinctValueArray: any[] = [];
    for (const value of distinctValueArray) {

      const valueObj = {
        val: value,
        isChecked: false
      };
      formatedDistinctValueArray.push(valueObj);
    }
    return formatedDistinctValueArray;
  }
  onFilterItemChanged(filterItemDetails: any, headerDetails: any) {
    console.log(filterItemDetails, headerDetails);
  }

  ngOnChanges(changes: any) {
    if (changes.gridHeaders) {
      this.setColumnWidth(changes.gridHeaders.currentValue);
    }
  }
  openClassification(batchname: string) {
    this.classification.emit(batchname);
  }
  openExtraction(batchname: string, batchID: number) {
    const extractionReq = {
      batchID: batchID,
      batchname: batchname
    };
    this.extraction.emit(extractionReq);
  }
}
