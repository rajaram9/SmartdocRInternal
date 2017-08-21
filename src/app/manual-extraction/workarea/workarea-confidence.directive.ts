declare var $: any;
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[siConfidence]',
})
export class ConfidenceDirective implements OnChanges {
  @Input() siConfidence: any;
  constructor(private el: ElementRef) {
  }
  // ngDoCheck() {

  // }
  ngOnChanges() {
    if (this.siConfidence > 80) {
      this.el.nativeElement.className = 'extracted-field-cell white';
    }
    if (this.siConfidence < 80) {
      this.el.nativeElement.className = 'extracted-field-cell yellow';
    }
    if (this.siConfidence < 40) {
      this.el.nativeElement.className = 'extracted-field-cell red';
    }
  }
}
