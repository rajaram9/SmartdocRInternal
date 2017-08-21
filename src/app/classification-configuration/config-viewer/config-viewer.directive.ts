import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[siCellDirective]'
})
export class CellDirective {
  @Output() ngModelChange = new EventEmitter();
  constructor(private el: ElementRef) {
  }

  @HostListener('keyup')
  onKeyUp() {
    this.ngModelChange.emit(this.el.nativeElement.innerText);
  }

}

@Directive({
  selector: '[siDocTypeDirective]'
})
export class DocTypeDirective {

  @Input() ngModel = '';
  @Output() ngModelChange = new EventEmitter();
  @Output() docTypeChange = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('input')
  onChange() {
    const updatedValue = this.el.nativeElement.innerText.trim();

    const changeData: any = {};
    changeData.oldValue = this.ngModel;
    changeData.newValue = updatedValue;

    this.docTypeChange.emit(changeData);
    this.ngModelChange.emit(updatedValue);
  }

}

@Directive({
  selector: '[siDocSummaryDirective]'
})
export class DocSummaryDirective {

  @Input() ngModel = '';
  @Input() docType = '';
  @Input() docProperty = '';

  @Output() ngModelChange = new EventEmitter();
  @Output() docSummaryChange = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('input')
  onChange() {
    const updatedValue = this.el.nativeElement.innerText.trim();

    const changeData: any = {};
    changeData.oldValue = this.ngModel;
    changeData.newValue = updatedValue;
    changeData.property = this.docProperty;
    changeData.docType = this.docType;

    this.docSummaryChange.emit(changeData);
    this.ngModelChange.emit(updatedValue);
  }

}

