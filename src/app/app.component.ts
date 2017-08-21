import { Component, OnInit } from '@angular/core';
import { HelperService } from './core/helper-service/helper.service';


@Component({
  selector: 'si-app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  leftNavOpen = true;
  openHelp = false;

  constructor(private helperService: HelperService) { }

  onDateChange(dateInfo: any) {
    console.log(dateInfo);
  }
  toggleLeftNavBar() {
    this.leftNavOpen = !this.leftNavOpen;
  }

  ngOnInit() {
    this.helperService.helpPanel$.subscribe(
      () => { this.openHelp = !this.openHelp; }
    );
  }
}
