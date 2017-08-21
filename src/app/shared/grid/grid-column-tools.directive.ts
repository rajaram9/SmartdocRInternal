declare var $: any;
import { Directive, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[siColumnTools]',
})
export class ColumnToolsDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }
  ngAfterViewInit() {
    $(this.el.nativeElement).mouseover((event: any) => {
      $(event.target).addClass('tools-enabled');
    });
    $(this.el.nativeElement).mouseleave((event: any) => {
      $(event.target).removeClass('tools-enabled');
    });
  }
}

@Directive({
  selector: '[siGridProperty]',
})
export class GridPropertyDirective implements AfterViewInit {
  @Output() gridWidth = new EventEmitter();
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const elementWidth = $(this.el.nativeElement).width();
    this.gridWidth.emit(elementWidth);
  }
}

