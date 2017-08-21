declare var $: any;
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer } from '@angular/core';

@Directive({
  selector: '[siDragAndDrop]',
})
export class DragAndDropDirective {
  @Input() pageIndex = 0;
  @Input() pageGroupIndex = 0;
  @Input() dragItemType = '';
  @Output() pageDrop = new EventEmitter();
  @Output() docTypeDrop = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    event.stopPropagation();
    event.dataTransfer.clearData();

    let sourceData: any = {};
    if (this.dragItemType === 'docType') {
      sourceData = {
        pageGroupIndex: this.pageGroupIndex
      };
      event.dataTransfer.setData('doctype', 'doctype');
    } else {
      sourceData = {
        pageIndex: this.pageIndex,
        pageGroupIndex: this.pageGroupIndex
      };
    }
    event.dataTransfer.setData('sourceData', JSON.stringify(sourceData));
  }
  @HostListener('dragenter', ['$event'])
  onDragEnter(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.manageDragAndDropClass(event, true);
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.manageDragAndDropClass(event, false);

  }
  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    // to prevent the drag event to bubble up
    event.stopPropagation();
    this.manageDragAndDropClass(event, false);

    const sourceData = JSON.parse(event.dataTransfer.getData('sourceData'));

    if (event.dataTransfer.types.indexOf('doctype') !== -1) {
      const destinationData = {
        pageGroupIndex: this.pageGroupIndex
      };
      const eventData = {
        sourceData: sourceData,
        destinationData: destinationData
      };
      this.docTypeDrop.emit(eventData);

    } else if (sourceData.pageIndex) {
      const destinationData = {
        pageIndex: this.pageIndex,
        pageGroupIndex: this.pageGroupIndex
      };
      const eventData = {
        sourceData: sourceData,
        destinationData: destinationData
      };
      this.pageDrop.emit(eventData);
    }
  }
  manageDragAndDropClass(event: any, isAdd: boolean) {
    if (event.dataTransfer.types.indexOf('doctype') !== -1) {
      this.renderer.setElementClass(event.target, 'doctype-drag-enter', isAdd);
    } else {
      this.renderer.setElementClass(event.target, 'page-drag-enter', isAdd);
    }
  }
}





@Directive({
  selector: '[siDocNameUpdate]'
})
export class DocNameUpdateDirective {

  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('input')
  onChange() {
    const updatedValue = this.el.nativeElement.innerText.trim();
    this.ngModelChange.emit(updatedValue);
  }

}
