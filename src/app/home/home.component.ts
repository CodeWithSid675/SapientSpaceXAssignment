import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgxSpinnerService]
})
export class HomeComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }
  developerName: string;
  ngOnInit() {
    this.developerName = Constants.DEVELOPER_NAME;
  }

  emitLoaderStarter(event) {
    if (event) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
