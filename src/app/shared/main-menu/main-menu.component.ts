import { Component, OnInit } from '@angular/core';
import { links } from '../../mock-datas/home-links.mock';

@Component({
  selector: 'si-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  mainMenuLinks: any;
  constructor() {
    this.mainMenuLinks = links;
  }

  ngOnInit() {
  }

}
