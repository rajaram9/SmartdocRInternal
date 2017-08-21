import {
  Component, OnInit, Input, Output, EventEmitter, ViewChildren, AfterViewInit, QueryList,
  OnChanges, ViewChild, ViewEncapsulation
} from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ManualClassificationService } from '../manual-classification.service';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

@Component({
  selector: 'si-manual-classification-workarea',
  templateUrl: 'workarea.component.html',
  styleUrls: ['workarea.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkAreaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() docTypes: any[] = [];
  @Input() batchName: any[] = [];
  @Output() save = new EventEmitter();
  @Output() pdf = new EventEmitter();
  @ViewChildren('focus') focusEnabledElements: QueryList<HTMLElement>;
  @ViewChild('imageCarousel') imageCarousel: ImageCarouselComponent;


  hotkeyItemIndex = 1;
  hotkeyItemCount = 0;
  activeNavItem = 'doc';
  currentActiveDoc: any;
  pagesSelectedForMove: any[];
  docSideBarEnabled = true;
  selectDoc: any;
  showdocViewer = true;
  percentage = 60;
  overallpercentage = 80;
  viewerpercentage = 40;
  selectedClassifyStatus: string[] = ['Classify', 'UnClassify'];
  constructor(private hotkeysService: HotkeysService,
    private manualClassificationService: ManualClassificationService) {
    this.hotkeys();

  }

  ngOnInit() {
    this.imageCarousel.onWindowResizeformExternal();
    // this.classifyStatus = [];
    // this.classifyStatus.push({ label: 'Classify', value: 'Classify' });
    // this.classifyStatus.push({ label: 'UnClassify', value: 'UnClassify' });
  }
  ngOnChanges() {
  }

  onNavItemChanged(selectedNav: string) {
    this.activeNavItem = selectedNav;
    if (this.activeNavItem === 'view') {
      this.showdocViewer = false;
      this.percentage = 100;
      this.imageCarousel.onWindowResizeformExternal();
    } else {
      this.showdocViewer = true;
      this.percentage = 60;
      this.imageCarousel.onWindowResizeformExternal();
    }
  }
  onDocSelected(selectedDoc: any) {
    this.currentActiveDoc = selectedDoc;
  }
  onDrag(eventData: any) {
    const sourcePageGroupIndex = eventData.sourceData.pageGroupIndex;
    const sourcePageIndex = eventData.sourceData.pageIndex;
    const destinationPageGroupIndex = eventData.destinationData.pageGroupIndex;
    const destinationPageIndex = eventData.destinationData.pageIndex;
    // Move Object
    this.docTypes[destinationPageGroupIndex].pages
      .splice(destinationPageIndex, 0,
      this.docTypes[sourcePageGroupIndex].pages.splice(sourcePageIndex, 1)[0]);

    const dropedPage = this.docTypes[destinationPageGroupIndex].pages[destinationPageIndex];

    this.manualClassificationService.removeViewMode(this.docTypes);
    this.manualClassificationService.addViewMode(dropedPage);
  }
  onDocTypeDrag(eventData: any) {
    const sourcePageGroupIndex = eventData.sourceData.pageGroupIndex;
    const destinationPageGroupIndex = eventData.destinationData.pageGroupIndex;
    // Move Object
    this.docTypes.splice(destinationPageGroupIndex, 0, this.docTypes.splice(sourcePageGroupIndex, 1)[0]);
  }
  onSave() {
    this.save.emit();
  }
  onPdfRequest(pdfRequest: any[]) {
    this.pdf.emit(pdfRequest);
  }
  movePages(targetDocTypeIndex) {
    this.pagesSelectedForMove.map(selectedPage => {
      selectedPage.page.selected = false;
      const movingObjIndex = this.docTypes[selectedPage.docTypeIndex].pages.indexOf(selectedPage.page);
      const movingObj = this.docTypes[selectedPage.docTypeIndex].pages.splice(movingObjIndex, 1)[0];
      const tdoctype = this.docTypes[targetDocTypeIndex].pages[0];
      movingObj.displayName = tdoctype.displayName;
      movingObj.groupName = tdoctype.groupName;
      movingObj.groupDisplayName = tdoctype.groupDisplayName;
      movingObj.isClassified = tdoctype.isClassified;
      this.docTypes[targetDocTypeIndex].pages.push(movingObj);
    });
    // bad code need to refactor. below  lines for trigger change detection
    const temp = this.docTypes;
    this.docTypes = [];
    setTimeout(() => {
      this.docTypes = temp;
    }, 100);

    this.imageCarousel.resetCurrentImageSelected();

    this.pagesSelectedForMove = [];
    this.activeNavItem = '';
  }
  moveToNewDocType(docTypeName) {

    const newDocType = {
      name: docTypeName,
      nameWithIndex: `${docTypeName}~1`,
      isClassified: true,
      isExpanded: true,
      pages: []
    };

    this.pagesSelectedForMove.map(selectedPage => {
      selectedPage.page.selected = false;
      const movingObjIndex = this.docTypes[selectedPage.docTypeIndex].pages.indexOf(selectedPage.page);
      let movingObj = this.docTypes[selectedPage.docTypeIndex].pages.splice(movingObjIndex, 1)[0];
      let tObj = newDocType.pages.length;
      movingObj.displayName = `${docTypeName}~` + tObj;
      movingObj.groupName = `${docTypeName}~` + tObj;
      movingObj.isClassified = true;
      movingObj.selected = true;
      newDocType.pages.push(movingObj);
    });

    this.docTypes.push(newDocType);

    this.imageCarousel.resetCurrentImageSelected();

    this.pagesSelectedForMove = [];
    this.activeNavItem = '';
  }
  moveToOtherBatch(targetDocDetails) {
    this.manualClassificationService.movePageToOtherBatch(targetDocDetails, this.pagesSelectedForMove).subscribe(
      success => {
        this.pagesSelectedForMove.map(selectedPage => {
          const movingObjIndex = this.docTypes[selectedPage.docTypeIndex].pages.indexOf(selectedPage.page);
          this.docTypes[selectedPage.docTypeIndex].pages.splice(movingObjIndex, 1);
        });
      }
    );

    this.imageCarousel.resetCurrentImageSelected();

    this.pagesSelectedForMove = [];
    this.activeNavItem = '';
  }
  hotkeys() {
    this.hotkeysService.add(new Hotkey('ctrl+q', (event: KeyboardEvent): boolean => {
      if (this.hotkeyItemIndex < this.hotkeyItemCount) {
        this.hotkeyItemIndex++;
      } else {
        this.hotkeyItemIndex = 1;
      }

      return false; // Prevent bubbling
    }));
    this.hotkeysService.add(new Hotkey('ctrl+m', (event: KeyboardEvent): boolean => {
      if (this.activeNavItem === 'move') { this.activeNavItem = ''; } else { this.activeNavItem = 'move'; }
      return false; // Prevent bubbling
    }));
  }
  ngAfterViewInit() {
    this.hotkeyItemCount = this.focusEnabledElements.length;

  }
  onPageSelect(selectedDoc) {
    this.manualClassificationService.removeViewMode(this.docTypes);
    this.manualClassificationService.addViewMode(selectedDoc);
    this.currentActiveDoc = selectedDoc;
  }
  closeBatchMoveWindow() {
    this.activeNavItem = '';
  }
  toggleDocSideBar() {
    this.docSideBarEnabled = !this.docSideBarEnabled;
    if (this.docSideBarEnabled === true) {
      this.overallpercentage = 80;
      this.viewerpercentage = 40;
      this.percentage = 60;
    }
    else {
      this.overallpercentage = 100;
      this.viewerpercentage = 34;
      this.percentage = 66;
    }

    this.imageCarousel.onWindowResizeformExternal();
  }
}
