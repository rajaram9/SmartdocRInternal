import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  newClient: any = {};
  constructor(private ClientService: ClientService) { }

  ngOnInit() {
  }
  savenewclient() {
    this.ClientService.savenewclientData(this.newClient).subscribe(
      data => { },
      error => { }
    );
  }

}
