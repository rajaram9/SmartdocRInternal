declare var $: any;
import { Directive, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[siCalendarInit]',
})
export class CalendarDirective implements AfterViewInit {

  @Output() selectedDate = new EventEmitter();
  selectedToDate: any;

  constructor(private el: ElementRef) {
  }
  ngAfterViewInit() {
    $(this.el.nativeElement).datepicker({
      format: 'MM/dd/yyyy',
      todayHighlight: true,
    }).on('changeDate', (event: any) => {
      this.selectedDate.emit(event.date);
    });
  }
}
