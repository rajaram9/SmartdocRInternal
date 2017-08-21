import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ManualClassificationService } from './manual-classification.service';
import { BatchImageService } from '../core/batch-image-service/batch-image.service';
import { AppConfigService } from '../app.config.service';
import { LoadingAnimateService } from 'ng2-loading-animate';


@Component({
  selector: 'si-manual-classification',
  templateUrl: 'manual-classification.component.html'
})
export class ManualClassificationComponent implements OnInit, OnDestroy {
  docTypes: any[] = [];
  routerSubscription: Subscription;
  batchName: string;

  constructor(
    private appConfigService: AppConfigService,
    private batchImageService: BatchImageService,
    private manualClassificationService: ManualClassificationService,
    private activatedRoute: ActivatedRoute, private _loadingSvc: LoadingAnimateService) { }

  ngOnInit() {
    this.routerSubscription = this.activatedRoute.queryParams.subscribe((param: any) => {
      this.batchName = param['batchName'];
      this.generateImage(this.batchName);
    });
  }
  start() {
    this._loadingSvc.setValue(true);
  }
  stop() {
    this._loadingSvc.setValue(false);
  }
  generateImage(batchName: string) {
    this.manualClassificationService.generateImageFromPdf(batchName)
      .subscribe(() => { this.getBatchImages(this.batchName); }
      );
  }
  getBatchImages(batchName: string) {
    this.batchImageService.getBatchImages(batchName)
      .subscribe(
      imageBatches => { this.formatBatchImages(imageBatches); }
      );
  }
  formatBatchImages(imageBatches: any[]) {
    this.batchImageService.formatBatchImage(imageBatches, this.batchName)
      .subscribe(
      images => { this.docTypes = images; }
      );
  }
  saveClassifiedPages() {
    this.start();
    this.manualClassificationService.saveClassifiedPages(this.batchName, this.docTypes).subscribe(
      () => {
        this.stop();
        setTimeout(() => { alert('saved'); }, 0);
      },
      () => { this.stop(); }
    );
  }
  onPdfRequest(pdfRequest: any[]) {
    this.manualClassificationService.generatePdf(this.batchName, pdfRequest).subscribe(
      link => {
        const pdfUrl = this.appConfigService.getConfig('ocrImageEndPoint') + link;
        window.open(pdfUrl);
      },
      error => { console.log(error); }
    );
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
