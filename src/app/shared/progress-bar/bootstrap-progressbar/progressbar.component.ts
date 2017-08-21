import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'si-bootstrap-progressbar',
  templateUrl: 'progressbar.component.html'
})
export class BootstrapProgressbarComponent implements OnInit, OnChanges {
  @Input() valuenow: number;
  @Input() valuemin: number;
  @Input() valuemax: number;
  completedPercentage = '';
  constructor() { }

  ngOnInit() {
    this.calculatePercentage();
  }
  ngOnChanges() {
    this.calculatePercentage();
  }

  calculatePercentage() {
    this.completedPercentage = ((this.valuenow / this.valuemax) * 100) + '%';
  }
}
