import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[siDocCarouselDrag]',
})
export class DocCarouselDragDirective {

  @Input() pageIndex = 0;
  @Input() pageGroupIndex = 0;
  constructor(private el: ElementRef) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    const sourceData = {
      pageIndex: this.pageIndex,
      pageGroupIndex: this.pageGroupIndex
    };
    event.dataTransfer.setData('sourceData', JSON.stringify(sourceData));
  }
  @HostListener('dragenter', ['$event'])
  onDragEnter(event: any) {
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    event.preventDefault();
  }
}
