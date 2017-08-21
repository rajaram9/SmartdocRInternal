import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HelperService } from '../../core/helper-service/helper.service';
import { SelectClientComponent } from '../select-client/select-client.component';

@Component({
  selector: 'si-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isMenuEnabled = false;
  @ViewChild('clientList') clientList: SelectClientComponent;
  currentUser = 'Test User';
  isHelpPanelOpen = false;
  mainMenuEnabled = false;

  constructor(
    private helperService: HelperService) { }

  ngOnInit() { }

  toggleHelp() {
    this.isHelpPanelOpen = !this.isHelpPanelOpen;
    this.helperService.openHelpPanel();
  }
  openClientList() {
    this.clientList.openModel();
  }
  onClientSelected(selectedClientName) {
    this.currentUser = `${selectedClientName} (${this.currentUser})`;
  }
}
