import { Component, OnInit, HostListener, ViewChild, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { AppConfigService } from '../../app.config.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import * as _ from 'lodash';

@Component({
  selector: 'si-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('imageWrap') imageWrap;

  @Input() width: number;
  @Input() height: number;
  @Input() docTypes: any = undefined;
  @Input() selectDoc: any;
  @Input() selectedClassifyStatus: any;


  @Output() selectForMove = new EventEmitter();
  @Output() imageForViewer = new EventEmitter();

  numberOfImageInRow: number;
  currentImageSelected = 0;
  imagePath = '';
  imageData: any[] = [];
  unclassfiedData: any[] = [];
  private event: MouseEvent;
  locdocTypes: any[] = [];
  filterdata1: any[] = [];
  filterdata: any[] = [];
  totalpageindoc: number = 0;
  extraheight: number = 20;

  constructor(
    private hotKeysService: HotkeysService,
    private appConfigService: AppConfigService) {
    this.imagePath = this.appConfigService.getConfig('ocrImageEndPoint');
    this.registerHotKeys();

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.numberOfImageInRow = this.getNumberOfImage();
  }

  ngOnInit() {
    this.numberOfImageInRow = this.getNumberOfImage();

  }

  ngOnChanges(changes) {
    //console.log(this.docTypes);

    //console.log(this.selectedClassifyStatus);
    this.docTypes = _.sortBy(this.docTypes, "isClassified");
    console.log(this.docTypes);
    if (this.docTypes.length > 0 && this.locdocTypes.length === 0) {
      this.locdocTypes = this.docTypes;
    }
    if (this.selectedClassifyStatus.length === 1) {
      if (this.docTypes.length === 0) {
        this.docTypes = this.locdocTypes;
      }
      //console.log(this.selectedClassifyStatus);
      if (this.selectedClassifyStatus[0] === 'Classify') {
        this.docTypes = this.docTypes.filter(doc => doc.isClassified === true);
        if (this.docTypes.length === 0) {
          this.imageData = [];
          this.unclassfiedData = [];
        }
      }
      if (this.selectedClassifyStatus[0] === 'UnClassify') {
        this.docTypes = this.docTypes.filter(doc => doc.isClassified === false);
        if (this.docTypes.length === 0) {
          this.imageData = [];
          this.unclassfiedData = [];
        }
      }
    }
    if (this.selectedClassifyStatus.length === 2 && this.locdocTypes.length > 0) {
      this.docTypes = this.locdocTypes;
    }
    if (this.selectedClassifyStatus.length === 0) {
      this.docTypes = [];
      this.imageData = [];
      this.unclassfiedData = [];
    }
    //if (changes.docTypes && this.docTypes.length > 0) {
    if (this.docTypes.length > 0) {
      this.imageData = [];
      this.unclassfiedData = [];
      this.totalpageindoc = 0;
      for (let i = 0; i < this.docTypes.length; i++) {
        const docType = this.docTypes[i];
        for (let j = 0; j < docType.pages.length; j++) {
          const page = docType.pages[j];
          page.docTypeIndex = i;
          page.pageIndex = j;
          page.isClassified = docType.isClassified;
          page.extraheight = 20;
          if (page.displayName.toLowerCase().indexOf('unknown') !== -1 || page.displayName.toLowerCase().indexOf('unclassfied') !== -1) {
            //this.imageData.unshift(page);
            page.totalpageindoc = 0;
            this.unclassfiedData.push(page);
          } else {
            page.totalpageindoc = this.totalpageindoc;
            page.displayName = docType.name + '-' + (j + 1);
            this.imageData.push(page);
          }
        }
        this.totalpageindoc = docType.pages.length;
      }
      if ((this.unclassfiedData.length > 0) && (this.imageData.length > 0)) {
        this.imageData[0].totalpageindoc = this.unclassfiedData.length;
        if (this.unclassfiedData.length > 30) {
          this.imageData[0].extraheight = 7;
        }
      }
      this.imageData = this.unclassfiedData.concat(this.imageData);
      console.log(this.imageData);
      this.resetCurrentImageSelected();
    }
    if (changes.selectDoc && this.selectDoc) {
      this.setCurrentImageSelected(this.selectDoc);
    }
    if (this.imageData.length > 0) {
      this.toggleSelect(this.currentImageSelected, this.currentImageSelected, false);
    }
  }
  ngAfterViewInit() {

  }

  registerHotKeys() {
    this.hotKeysService.add(new Hotkey(['left', 'right', 'up', 'down'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
      this.moveImageFocus(combo, false);
      event.returnValue = false;
      return event;
    }));
    this.hotKeysService.add(
      new Hotkey(['shift+left', 'shift+right', 'shift+up', 'shift+down'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
        combo = combo.replace('shift+', '');
        this.moveImageFocus(combo, true);
        event.returnValue = false;
        return event;
      }));
    this.hotKeysService.add(new Hotkey('space', (event: KeyboardEvent): ExtendedKeyboardEvent => {
      // this.toggleSelect(this.currentImageSelected, this.currentImageSelected, false);
      // this.imageData[this.currentImageSelected].isSelected = !this.imageData[this.currentImageSelected].isSelected;
      event.returnValue = false;
      return event;
    }));
    this.hotKeysService.add(new Hotkey('shift+c', (event: KeyboardEvent): ExtendedKeyboardEvent => {
      this.selectAll();
      event.returnValue = false;
      return event;
    }));
    this.hotKeysService.add(new Hotkey('shift+u', (event: KeyboardEvent): ExtendedKeyboardEvent => {
      this.unSelectAll();
      event.returnValue = false;
      return event;
    }));
  }
  getNumberOfImage() {
    // Math.floor(wrap width/(image width+image margin)
    return Math.floor(this.imageWrap.nativeElement.offsetWidth / (this.width + 5));
  }
  moveImageFocus(key: string, isShiftPressed: boolean) {
    let tempIndex = 0;
    switch (key) {
      case 'right':
        tempIndex = this.currentImageSelected + 1;
        if (tempIndex < this.imageData.length) {
          this.toggleSelect(this.currentImageSelected, tempIndex, isShiftPressed);
        }
        break;
      case 'left':
        tempIndex = this.currentImageSelected - 1;
        if (tempIndex >= 0) {
          this.toggleSelect(this.currentImageSelected, tempIndex, isShiftPressed);
        }
        break;
      case 'up':
        tempIndex = this.currentImageSelected - (this.numberOfImageInRow);
        if (tempIndex >= 0) {
          this.toggleSelect(this.currentImageSelected, tempIndex, isShiftPressed);
          this.imageWrap.nativeElement.scrollTop = this.imageWrap.nativeElement.scrollTop - 300;
        }
        break;
      case 'down':
        tempIndex = this.currentImageSelected + (this.numberOfImageInRow);
        if (tempIndex < this.imageData.length) {
          this.toggleSelect(this.currentImageSelected, tempIndex, isShiftPressed);
          this.imageWrap.nativeElement.scrollTop = this.imageWrap.nativeElement.scrollTop + 300;
        }
        break;
    }
    this.openDocInImageViewer(this.currentImageSelected);
  }
  toggleSelect(currentImageSelected, newIndex, isShiftPressed) {
    if (isShiftPressed) {
      this.imageData[currentImageSelected].isSelected = true;
      this.imageData[newIndex].isSelected = true;
      this.currentImageSelected = newIndex;
    } else {
      this.imageData.forEach(data => data.isSelected = false);
      // this.imageData[currentImageSelected].isSelected = false;
      this.imageData[newIndex].isSelected = true;
      this.currentImageSelected = newIndex;
      if (this.currentImageSelected === 0) {
        setTimeout(() => {
          this.openDocInImageViewer(this.currentImageSelected);
        }, 1000);
      }
    }
    this.selectionChange();
  }
  selectionChange() {
    const selectedPages = this.imageData.reduce((result: any[], data) => {
      if (data.isSelected === true) {
        result.push({
          docTypeIndex: data.docTypeIndex,
          page: data
        });
        return result;
      } else {
        return result;
      }
    }, []);
    this.selectForMove.emit(selectedPages);
  }

  resetCurrentImageSelected() {
    const selectedImages = this.imageData.filter(data => data.isSelected === true);
    if (selectedImages.length > 0) {
      this.currentImageSelected = this.imageData.indexOf(selectedImages[0]);
    }
  }
  setCurrentImageSelected(doc) {
    this.currentImageSelected = this.imageData.indexOf(doc);
  }
  setCurrentImageSelectedbyMouse(doc, pressshift) {
    if (pressshift === false) {
      this.imageData.forEach(data => data.isSelected = false);
    }
    const imgindex = this.imageData.indexOf(doc);
    if (this.imageData[imgindex].isSelected === true) {
      this.imageData[imgindex].isSelected = false;
    } else {
      this.currentImageSelected = this.imageData.indexOf(doc);
      this.imageData[this.currentImageSelected].isSelected = true;
    }
    this.openDocInImageViewer(this.currentImageSelected);
    this.selectionChange();
  }
  onEvent(event: MouseEvent, data): void {
    this.event = event;
    this.setCurrentImageSelectedbyMouse(data, this.event.shiftKey);
  }
  selectAll() {
    this.imageData = this.imageData.map(data => {
      data.isSelected = true;
      return data;
    });
  }
  unSelectAll() {
    this.imageData = this.imageData.map(data => {
      data.isSelected = false;
      return data;
    });
  }
  openDocInImageViewer(index) {
    this.imageForViewer.emit(this.imageData[index]);
  }
  onWindowResizeformExternal() {
    setTimeout(() => {
      this.numberOfImageInRow = this.getNumberOfImage();
      //console.log(this.numberOfImageInRow);
      if (this.numberOfImageInRow > 3) {
        this.extraheight = 20;
      }
    }, 2000);
  }
  formartedKeyedJSON(data) {
    return data.reduce((obj, ele) => {
      if (!obj[ele.groupName]) {
        obj[ele.groupName] = {};
        obj[ele.groupName].groupName = ele.groupName;
        obj[ele.groupName].pages = [];
      }
      obj[ele.groupName].pages.push(ele);
      return obj;
    }, {});
  }
  getDistinctDocType(data: any) {
    return Object.keys(data);
  }
}
