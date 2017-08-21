import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppConfigService } from '../../app.config.service';
import { Router } from '@angular/router';


@Component({
  selector: 'si-classification-output',
  templateUrl: 'classification-output.html',
  styleUrls: ['classification-output.css']
})
export class ClassificationOutputComponent implements OnInit, OnChanges {

  @Input() files: any[] = [];
  @Input() uploadfilename: any[] = [];
  batchPath: string;

  constructor(private router: Router, private appConfigService: AppConfigService) {
    this.batchPath = appConfigService.getConfig('ocrImageEndPoint');
  }
  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.files);
  }

  openOutputViewer(file: any) {
    this.router.navigate(['/classification/OutputViewer', { batchname: file.batchname }]);
  }

}
