import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-grid-tools',
  templateUrl: 'grid-tools.component.html',
  styleUrls: ['grid-tools.component.css']
})
export class GridToolsComponent implements OnInit {
  @Input() filterArray: any[];
  @Output() filterItemChanged = new EventEmitter();
  active: Number;
  constructor() {
    this.active = 1;
  }

  ngOnInit() {

  }

  filterItemClick(filterItem: string, status: boolean) {
    const filterItemDetails = {
      item: filterItem,
      status: status
    };
    this.filterItemChanged.emit(filterItemDetails);
  }
}
