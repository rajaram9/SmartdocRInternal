import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-leftnav',
  templateUrl: 'left-nav.component.html',
  styleUrls: ['left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  @Input() filterCategorys: any[];
  @Output() onApplyFilter = new EventEmitter();
  constructor() {
  }

  ngOnInit() {

  }
  applyFilter(filterItem) {
    this.onApplyFilter.emit(filterItem);
  }
}
