import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-doc-search',
  templateUrl: 'docSearch.component.html',
  styleUrls: ['docSearch.component.css']
})
export class DocSearchComponent implements OnInit {
  @Output() searchKeyword = new EventEmitter();
  searchKey: string;

  constructor() { }

  ngOnInit() {
  }
  searchContact() {
    this.searchKeyword.emit(this.searchKey);
  }
}
