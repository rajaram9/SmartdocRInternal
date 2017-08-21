import { Component, OnInit, Input } from '@angular/core';
import { ProcessFilter } from './process-filter.interface';

@Component({
  selector: 'si-process-type-filter',
  templateUrl: 'process-type-filter.component.html',
  styleUrls: ['process-type-filter.component.css']
})
export class ProcessTypeFilterComponent implements OnInit {
  @Input() header = '';
  @Input() filterItemGroup: ProcessFilter[] = [];
  open = false;
  constructor() { }

  ngOnInit() { }
}
