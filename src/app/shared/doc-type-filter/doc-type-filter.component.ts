import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'si-doc-type-filter',
  templateUrl: 'doc-type-filter.component.html',
  styleUrls: ['doc-type-filter.component.css']
})
export class DocTypeFilterComponent implements OnInit {
  @Input() header = '';
  @Input() filterItems: FilterItem[] = [];
  open = false;
  constructor() { }

  ngOnInit() { }
}


export interface FilterItem {
  text: string;
  itemCount: number;
}
