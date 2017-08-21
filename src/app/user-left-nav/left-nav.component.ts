import { Component, OnInit } from '@angular/core';
import { ProcessFilter } from '../shared/process-type-filter/process-filter.interface';
import { autoFilter } from '../shared/process-type-filter/process-filter-mock-data';

@Component({
  selector: 'si-userleftnav',
  templateUrl: 'left-nav.component.html',
  styleUrls: ['left-nav.component.css']
})
export class UserLeftNavComponent implements OnInit {
  autoProcessFilter: ProcessFilter[];
  constructor() {
    this.autoProcessFilter = autoFilter;
  }

  ngOnInit() { }
}
