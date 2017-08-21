import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { AppConfigService } from '../../app.config.service';
import { ManualClassificationService } from '../manual-classification.service';
import { HotkeysService } from 'angular2-hotkeys';

@Component({
  selector: 'si-doc-carousel',
  templateUrl: 'doc-carousel.component.html',
  styleUrls: ['doc-carousel.component.scss']
})
export class DocCarouselComponent implements OnInit, OnChanges {
  @ViewChild('imageWrap') imageWrap;

  @Input() docTypes: any[] = [];
  @Input() width: number;
  @Input() height: number;

  @Output() itemSelected = new EventEmitter();
  @Output() openNav = new EventEmitter();
  @Output() selectForMove = new EventEmitter();

  private numberOfImageInRow: number;
  private selectedPages: any[] = [];
  private imagePath = '';

  constructor(
    private appConfigService: AppConfigService,
    private hotKeysService: HotkeysService,
    private manualClassificationService: ManualClassificationService) {
    this.imagePath = this.appConfigService.getConfig('ocrImageEndPoint');
  }
  ngOnInit() {
    this.numberOfImageInRow = this.getNumberOfImage();
  }
  ngOnChanges() {
  }
  onItemSelect(selectedPage: any) {
    this.manualClassificationService.removeViewMode(this.docTypes);
    this.manualClassificationService.addViewMode(selectedPage);
    this.itemSelected.emit(selectedPage);
  }

  onSelectionChange(docTypeIndex: number, pageIndex: number, page: any, event: any) {
    event.stopPropagation();

    const selectionObject = {
      docTypeIndex: docTypeIndex,
      page: page
    };

    if (event.target.checked) {
      selectionObject.page.selected = true;
      this.selectedPages.push(selectionObject);
    } else {
      const selectedPageIndex = this.selectedPages.indexOf(selectionObject);
      this.selectedPages.splice(selectedPageIndex, 1);
      selectionObject.page.selected = false;
    }

    if (this.selectedPages.length > 0) {
      this.openNav.emit('move');
    } else {
      this.openNav.emit('');
    }
    this.selectForMove.emit(this.selectedPages);

  }
  // @HostListener('window:resize', ['$event'])
  // onWindowResize(event) {
  //   this.numberOfImageInRow = this.getNumberOfImage();
  // }
  // registerHotKeys() {
  //   this.hotKeysService.add(new Hotkey(['left', 'right', 'up', 'down'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
  //     this.moveImageFocus(combo, false);
  //     event.returnValue = false;
  //     return event;
  //   }));
  //   this.hotKeysService.add(
  //     new Hotkey(['ctrl+left', 'ctrl+right', 'ctrl+up', 'ctrl+down'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
  //       combo = combo.replace('ctrl+', '');
  //       this.moveImageFocus(combo, true);
  //       event.returnValue = false;
  //       return event;
  //     }));
  //   this.hotKeysService.add(new Hotkey('enter', (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
  //     this.toggleSelect(this.currentImageSelected);
  //     event.returnValue = false;
  //     return event;
  //   }));
  // }
  getNumberOfImage() {
    // Math.floor(wrap width/(image width+image margin)
    return Math.floor(this.imageWrap.nativeElement.offsetWidth / (this.width + 5));
  }
  // moveImageFocus(key: string, isCtrlPressed: boolean) {
  //   let tempIndex = 0;
  //   switch (key) {
  //     case 'right':
  //       tempIndex = this.currentImageSelected + 1;
  //       if (tempIndex < this.imageData.length) {
  //         this.currentImageSelected = tempIndex;
  //       }
  //       break;
  //     case 'left':
  //       tempIndex = this.currentImageSelected - 1;
  //       if (tempIndex >= 0) {
  //         this.currentImageSelected = tempIndex;
  //       }
  //       break;
  //     case 'up':
  //       tempIndex = this.currentImageSelected - (this.numberOfImageInRow);
  //       if (tempIndex >= 0) {
  //         this.currentImageSelected = tempIndex;
  //       }
  //       break;
  //     case 'down':
  //       tempIndex = this.currentImageSelected + (this.numberOfImageInRow);
  //       if (tempIndex < this.imageData.length) {
  //         this.currentImageSelected = tempIndex;
  //       }
  //       break;
  //   }
  //   if (isCtrlPressed) { this.toggleSelect(this.currentImageSelected); }
  // }
  // toggleSelect(currentImageSelected) {
  //   this.imageData[currentImageSelected].isSelected = !this.imageData[currentImageSelected].isSelected;
  // }
}
