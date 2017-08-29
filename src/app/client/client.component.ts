import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() {}
  rowData = [];
  contactDetails = {};
  addRow(data) {
    this.rowData.push({
      
    })
  }
  removeRow(i) {
     this.rowData.splice(i, 1);
    
  }
  ngOnInit() {}

}
