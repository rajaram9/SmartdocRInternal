<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
=======
import {
  Component,
  OnInit
} from '@angular/core';
>>>>>>> 46166a605883bc4c8c5abd4abadd99bd23b5f4a9

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
