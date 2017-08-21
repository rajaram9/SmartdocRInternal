import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConfigService } from '../../app.config.service';

@Component({
  selector: 'si-extraction-doc-carousel',
  templateUrl: 'doc-carousel.component.html',
  styleUrls: ['doc-carousel.component.css']
})
export class ExtractionDocCarouselComponent implements OnInit {
  @Input() docType: any = [];
  @Input() Frompage: string;
  @Output() itemSelected = new EventEmitter();
  imagePath = '';
  SelectedPageonclick: any;

  constructor(private appConfigService: AppConfigService) {
    this.imagePath = this.appConfigService.getConfig('ocrImageEndPoint');
  }

  ngOnInit() {
    setTimeout(() => {
      // console.log(this.docType);
      this.SelectedPageonclick = this.docType[0];
    }, 1000);
    //
  }

  onItemSelect(selectedPage: any) {
    this.SelectedPageonclick = selectedPage;
    this.itemSelected.emit(selectedPage);
  }
}
