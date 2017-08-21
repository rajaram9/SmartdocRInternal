
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-clients-ddl',
  templateUrl: 'clients-ddl.component.html',
  styleUrls: ['clients-ddl.component.css']

})
export class ClientsddlComponent implements OnInit {

  @Output() selectedClient = new EventEmitter();
  value = '1';

  constructor() {

  }
  ngOnInit() {
    this.selectedClient.emit(this.value);
  }
  callType(value) {
    this.selectedClient.emit(value);
  }
}
