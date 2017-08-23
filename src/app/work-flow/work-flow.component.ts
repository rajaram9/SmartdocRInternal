import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {
  processFlowDefault:any = [
      {name: "Auto classfication"},
      {name: "Manual classfication"},
      {name: "Auto extraction"},
      {name: "Manual extraction"},
      {name: "Auditor classfication"},
      {name: "Manual upload"},
      {name: "Connect to DB"},
      {name: "Connect to DMS"},
      {name: "Connect to"}
  ];
processFlowSet:any = [];
  constructor() { }

  ngOnInit() {
  }

    onFruitDrop(e: any) {
    this.processFlowSet.push(e.dragData);
    this.removeItem(e.dragData, this.processFlowDefault);
  }
    removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
}
