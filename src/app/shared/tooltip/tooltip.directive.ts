declare var $: any;
import { Directive, ElementRef, AfterViewInit } from '@angular/core';


@Directive({
  selector: '[siTooltip]'
})
export class TooltipDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    $(this.elementRef.nativeElement).tooltip();
  }

}
