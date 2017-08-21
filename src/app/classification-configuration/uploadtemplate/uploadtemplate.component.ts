import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../core/csv-service/csv.service';
import { CSvFileds } from '../../interfaces/CSVFields';
@Component({
  selector: 'si-uploadtemplate',
  templateUrl: 'uploadtemplate.component.html',
  styleUrls: ['uploadtemplate.component.css']

})
export class UploadtemplateComponent implements OnInit {
  constructor(private csvService: CSVService) { }

  ngOnInit() {
    // let dataRow = jsondata.split('\n');
    // let formatedData = this.formatCSVData(dataRow);
    // setTimeout(() => {
    //   this.csvService.AddCSVData(formatedData);
    // }, 1000);
  }

  onChange(event: any) {
    const file = event.srcElement.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const dataRow = e.target.result.split('\n');
      const formatedData = this.formatCSVData(dataRow);
      this.csvService.AddCSVData(formatedData);
    };
    reader.readAsText(file);
  }
  BtClick(event: any) {

  }

  formatCSVData(csvData: any): CSvFileds[] {
    const fieldDatas: CSvFileds[] = <CSvFileds[]>[];
    for (let i = 1; i < csvData.length; i++) {
      const fieldData: CSvFileds = <CSvFileds>{};
      const fields = csvData[i].split(',');
      fieldData.DocTypeName = fields[0];
      fieldData.MinPages = fields[1];
      fieldData.MaxPages = fields[2];
      fieldData.HavingPageNumbers = fields[3];
      fieldData.PageNumberFormat = fields[4];
      fieldData.AddIfPrevTypeisSame = fields[5];
      fieldData.Priority = fields[6];
      fieldData.Keyword = fields[7];
      fieldData.PagePosition = fields[8];
      fieldData.Percentageofsimilarity = fields[9];
      fieldData.KeywordThresholdpercetage = fields[10];
      fieldData.ZoneArea = fields[11];
      fieldData.Casesensitive = fields[12];
      fieldDatas.push(fieldData);
    }
    return fieldDatas;

  }

}
