declare const $: any;
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SelectClientService } from './select-client.service';


@Component({
  selector: 'si-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.css']
})
export class SelectClientComponent implements OnInit, AfterViewInit {
  @ViewChild('clientModel') clientModel;
  @Output() clientSelected = new EventEmitter();
  clients: any[] = [];
  clientModelDiv: HTMLDivElement;
  selectedClient: any;
  constructor(private selectClientService: SelectClientService) { }


  openModel() {
    $(this.clientModelDiv).modal();
  }
  save(selectedClientID) {
    this.clientSelected.emit(selectedClientID);
    this.closeModel();
  }
  closeModel() {
    $(this.clientModelDiv).modal('hide');
  }



  ngOnInit() {
    this.clients = this.selectClientService.getClientList();
  }
  ngAfterViewInit() {

    this.clientModelDiv = this.clientModel.nativeElement;

  }


}
