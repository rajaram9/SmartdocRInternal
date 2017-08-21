import { Injectable } from '@angular/core';
import { CSvFileds } from '../../interfaces/CSVFields';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CSVService {

  private CSVSource = new Subject<CSvFileds[]>();
  CSVSource$ = this.CSVSource.asObservable();

  constructor() { }

  AddCSVData(csvdata: CSvFileds[]) {
    this.CSVSource.next(csvdata);
  }
}
