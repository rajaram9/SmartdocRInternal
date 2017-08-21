import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  fromDate = new Date();
  toDate = new Date();
  active = false;
  submitOver = false;
  cancelOver = false;
  @Output() dateSelected = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  onFromDateChange(date: Date) {
    this.fromDate = date;
  }
  onToDateChange(date: Date) {
    this.toDate = date;
  }
  onDateSelected() {
    const dateInfo: any = {};
    dateInfo.fromDate = this.fromDate;
    dateInfo.toDate = this.toDate;

    this.dateSelected.emit(dateInfo);
    this.active = false;
  }
  close() {
    this.active = false;
  }
}
