import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'si-progressbar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() maxValue;
  @Input() value = 0;
  @Input() barStyle = 'success';
  @Input() height = 20;
  percentage: number;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    const total = typeof this.maxValue === 'undefined' ? 100 : this.maxValue;
    this.percentage = (this.value / total) * 100;
  }

}
