import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[siFocus]'
})
export class FocusDirective implements OnChanges {

  @Input() siFocus = false;
  constructor(private element: ElementRef) { }

  ngOnChanges() {
    if (this.siFocus) {
      this.element.nativeElement.focus();
    }
  }

}
