import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BatchMoveService } from './batch-move.service';
import { BatchImageService } from '../../../core/batch-image-service/batch-image.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'si-batch-move',
  templateUrl: './batch-move.component.html',
  styleUrls: ['./batch-move.component.scss']
})
export class BatchMoveComponent implements OnInit, AfterViewInit {

  @Input() docTypes: any[];
  @Output() moveToOther = new EventEmitter();
  @Output() moveToNew = new EventEmitter();
  @Output() moveToOtherBatch = new EventEmitter();
  @Output() close = new EventEmitter();

  @ViewChild('moveOtherDoc') moveOtherDoc: ElementRef;
  @ViewChild('moveNewDoc') moveNewDoc: ElementRef;
  @ViewChild('moveNewBatch') moveNewBatch: ElementRef;
  @ViewChild('#otherTab') otherTab: ElementRef;


  clientDocTypes: string[];
  batches: string[];
  batchDocs: any[];
  selectedDocTypeIndex: any;
  clientDocType: any;
  selectedBatch: any;
  selectedBatchDoc: any;

  constructor(
    private batchMoveService: BatchMoveService,
    private batchImageService: BatchImageService,
    private hotKeysService: HotkeysService) {
    this.attachHotKeys();
  }

  ngOnInit() {
    this.getDocTypes();
    this.getBatches();
  }
  ngAfterViewInit() {
    this.putFocus('other');
  }

  getDocTypes() {
    this.batchMoveService.getDocTypes().subscribe(clientDocTypes => {
      this.clientDocTypes = clientDocTypes;
    });
  }
  getBatches() {
    this.batchMoveService.getBatchs().subscribe(batches => {
      this.batches = batches;
    });
  }
  onBatchChange(selectedBatch) {
    this.batchImageService.getBatchImages(selectedBatch)
      .subscribe(
      imageBatches => { this.formatBatchImages(imageBatches, selectedBatch); }
      );
  }
  formatBatchImages(imageBatches: any[], selectedBatch: string) {
    this.batchImageService.formatBatchImage(imageBatches, selectedBatch)
      .subscribe(
      images => this.batchDocs = images,
      error => console.log(error));
  }
  onMoveToOtherBatch(selectedBatch, selectedBatchDoc) {
    const targetDoc = {
      'batch': selectedBatch,
      'doc': selectedBatchDoc
    };
    this.moveToOtherBatch.emit(targetDoc);
  }
  putFocus(tab) {
    // console.log(tab);
    switch (tab) {
      case 'other':
        setTimeout(() => {
          this.moveOtherDoc.nativeElement.focus();
        }, 1);
        break;

      case 'new':
        setTimeout(() => {
          this.moveNewDoc.nativeElement.focus();
        }, 1);
        break;

      case 'newBatch': {
        setTimeout(() => {
          this.moveNewBatch.nativeElement.focus();
        }, 1);
        break;
      }
    }
  }
  attachHotKeys() {
    this.hotKeysService.add(new Hotkey('ctrl+1', (event: KeyboardEvent): ExtendedKeyboardEvent => {
      this.otherTab.nativeElement.click();
      event.returnValue = false;
      return event;
    }));
  }
}
