import { Component } from '@angular/core';


@Component({
  selector: 'si-classification-config',
  templateUrl: 'classification-config.component.html',
  styleUrls: ['classification-config.component.css']
})
export class ClassificationConfigComponent {
  searchKeyword: string;
  onsearch(keyword: string) {
    this.searchKeyword = keyword;
  }
}
