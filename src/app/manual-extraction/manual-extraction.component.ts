import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { BatchImageService } from '../core/batch-image-service/batch-image.service';
import { ManualExtractionService } from './manual-extraction.service';

@Component({
  selector: 'si-manual-extraction',
  templateUrl: 'manual-extraction.component.html'
})
export class ManualExtractionComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  private batchName: string;
  private batchID: number;
  batchData: any[] = [];
  docTypes: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private batchImageService: BatchImageService,
    private manualExtractionService: ManualExtractionService
  ) { }

  getBatchImages(batchName: string) {
    this.batchImageService.getBatchImages(batchName)
      .subscribe(
      batchImages => { this.formatBatchImages(batchImages); },
      error => { }
      );
  }
  formatBatchImages(imageBatches: any[]) {
    this.batchImageService.formatBatchImage(imageBatches, this.batchName)
      .subscribe(
      images => { this.docTypes = images; },
      error => { }
      );
  }
  getExtractedData(batchID: number) {
    this.manualExtractionService.getExtractedData(batchID).subscribe(extractData => {
      this.batchData = extractData;
    },
      error => { console.log(error); }
    );
  }


  // life cycle hook
  ngOnInit() {
    this.routerSubscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.batchName = param['batchName'];
        this.batchID = param['batchID'];
        this.getBatchImages(this.batchName);
        this.getExtractedData(this.batchID);
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }


}
