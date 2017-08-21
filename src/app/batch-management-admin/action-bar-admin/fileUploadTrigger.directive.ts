import { Directive, ElementRef, Renderer } from '@angular/core';


@Directive({
  selector: '[siFileUploadTrigger]'
})
export class FileUploadTriggerDirective {

  constructor(
    private ele: ElementRef,
    private renderer: Renderer) {
  }
  openFileDialog() {
    const event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(this.ele.nativeElement, 'dispatchEvent', [event]);
  }
}
