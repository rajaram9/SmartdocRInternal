import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'si-icon-nav',
  templateUrl: 'icon-nav.component.html',
  styleUrls: ['icon-nav.component.css']
})
export class IconNavComponent implements OnInit {
  @Input() active = '';
  @Output() navItemChanged = new EventEmitter();

  constructor() {
    this.active = 'doc';
  }

  ngOnInit() { }

  selectNavItem(selectedItem: string) {
    if (this.active === selectedItem) {
      this.active = '';
      this.navItemChanged.emit('');
    } else {
      this.active = selectedItem;
      this.navItemChanged.emit(selectedItem);
    }
  }
}
