import { Component, OnInit } from '@angular/core';
import { helpData } from './help.mock';

@Component({
  selector: 'si-help',
  templateUrl: 'help.component.html',
  styleUrls: ['help.component.css']
})
export class HelpComponent implements OnInit {
  helpData: any;
  constructor() {
    this.helpData = helpData;
  }

  ngOnInit() { }
}
