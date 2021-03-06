import { Component, OnInit } from '@angular/core';
import { gridHeaders, gridData } from '../shared/grid/grid-mock-data';

@Component({
  selector: 'si-batch-managment',
  templateUrl: 'batch-management.component.html',
  styleUrls: ['batch-management.component.css']
})
export class BatchManagmentComponent implements OnInit {
  leftNavOpen = true;
  gridData: any;
  gridHeaders: any;
  constructor() {
    this.gridData = gridData;
    this.gridHeaders = gridHeaders;
  }

  ngOnInit() { }

  onDateChange(dateInfo: any) {
    console.log(dateInfo);
  }
  toggleLeftNavBar() {
    this.leftNavOpen = !this.leftNavOpen;
  }
}
