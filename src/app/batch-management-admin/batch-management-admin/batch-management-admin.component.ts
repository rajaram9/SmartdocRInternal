import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gridHeaders } from '../../shared/grid/grid-mock-data';
import { GridTableComponent } from '../../shared/grid/grid.component';
import { BatchManagementAdminService } from './batch-management-admin.service';
import { OCRStatus } from '../../interfaces/status.interface';
import { categorys } from '../../shared/left-nav/left-nav-filter-items';
import { LoadingAnimateService } from 'ng2-loading-animate';

@Component({
  selector: 'si-batch-managment-admin',
  templateUrl: 'batch-management-admin.component.html',
  styleUrls: ['batch-management-admin.component.scss'],
  providers: [BatchManagementAdminService]
})
export class BatchManagmentAdminComponent implements OnInit {
  @ViewChild(GridTableComponent) gridTableComponent: GridTableComponent;
  leftNavFilters: any[];
  leftNavOpen = true;
  gridData: any[] = [];
  gridHeaders: any;
  batches: any[];

  constructor(
    private batchManagementAdminService: BatchManagementAdminService,
    private router: Router,
    private _loadingSvc: LoadingAnimateService
  ) {
    this.gridHeaders = gridHeaders;
    this.leftNavFilters = categorys;
  }
  start() {
    this._loadingSvc.setValue(true);
  }
  stop() {
    this._loadingSvc.setValue(false);
  }
  ngOnInit() {
    this.start();
    this.getBatches();
    setInterval(() => { this.getBatches(); }, 15000);
  }
  onDateChange(dateInfo: any) {
    console.log(dateInfo);
  }
  toggleLeftNavBar() {
    this.leftNavOpen = !this.leftNavOpen;
  }
  onNewBatchAdded(batchDetails: any[]) {
    this.gridTableComponent.addRowToGrid(this.formatBatchDetails(batchDetails));
  }
  formatBatchDetails(batchDetails: any[]) {
    const batchs: any[] = [];
    batchDetails.map((batch) => {
      const eta = new Date();
      eta.setHours(eta.getHours() + 1);
      const newBatchObj = {};
      newBatchObj['batchid'] = batch['batchid'];
      newBatchObj['ocrengine'] = batch['ocrengine'];
      newBatchObj['priority'] = '-';
      newBatchObj['workflowName'] = '-';
      newBatchObj['operatorName'] = '-';
      newBatchObj['notes'] = '-';
      newBatchObj['batchname'] = batch['batchname'];
      newBatchObj['totalnoofpages'] = batch['totalnoofpages'];
      newBatchObj['processingpages'] = batch['processingpages'];
      newBatchObj['classifieddocs'] = batch['classifieddocs'];
      newBatchObj['unClassifieddocs'] = batch['unClassifieddocs'];
      newBatchObj['batchname'] = batch['batchname'];
      newBatchObj['status'] = OCRStatus[batch['statusid']];
      newBatchObj['queue'] = OCRStatus[batch['queueStatusid']];
      newBatchObj['statusID'] = batch['statusid'];
      newBatchObj['queueID'] = batch['queueStatusid'];
      newBatchObj['eta'] = this.formatDate(eta);
      newBatchObj['received'] = this.formatDate(batch['createddate']);
      newBatchObj['classifydocs'] = batch['classifydocs'];
      newBatchObj['noofExtractions'] = batch['noofExtractions'];
      batchs.push(newBatchObj);
    });
    return batchs;
  }
  formatDate(date: Date) {
    const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
  }
  getBatches() {
    this.batchManagementAdminService.getBatches().subscribe(
      batches => {
        this.batches = this.formatBatchDetails(batches);
        this.gridData = this.batches;
        this.leftNavFilters = this.updateFilterCounter(categorys, this.batches);
        this.stop();
      },
      error => { this.stop(); }
    );
  }
  openClassification(batchname: string) {
    this.router.navigate(['manualClassification'], { queryParams: { batchName: batchname } });
  }
  openExtraction(extractionReq: any) {
    this.router.navigate(['manualExtraction'], {
      queryParams: {
        batchName: extractionReq.batchname,
        batchID: extractionReq.batchID
      }
    });
  }
  onApplyFilter(filterItem) {
    const [statusID, queueID] = filterItem.filterIDs;
    if (statusID === 0 && queueID === 0) {
      this.gridData = this.batches;
    } else {
      this.gridData = this.batches.filter(batch => {
        if (statusID === 0) {
          return batch.queueID === queueID;
        } else if (queueID === 0) {
          return batch.statusID === statusID;
        } else {
          return batch.statusID === statusID && batch.queueID === queueID;
        }
      });
    }
  }
  updateFilterCounter(filters, batchData) {
    const filterMatrix = this.createMatrix(15, 15);
    batchData.map(data => {
      const cellValue = filterMatrix[data.statusID][data.queueID];
      // console.log(data.statusID, data.queueID, cellValue);
      filterMatrix[data.statusID][data.queueID] = cellValue + 1;
    });

    filters = filters.map(filter => {
      if (filter.subCategorys) {
        filter.subCategorys.map(subCategory => {
          subCategory.items.map(item => {
            item.count = filterMatrix[item.filterIDs[0]][item.filterIDs[1]];
          });
        });
      } else {
        filter.items.map(item => {
          item.count = filterMatrix[item.filterIDs[0]][item.filterIDs[1]];
        });
      }
      return filter;
    });
    return filters;
  }
  createMatrix(x: number, y: number) {
    const matrix = new Array(x);
    while (x--) {
      matrix[x] = new Array(y).fill(0);
    }
    return matrix;
  }
}
