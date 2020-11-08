import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  years: object = [];
  constructor() { }

  ngOnInit() {
    this.years = this.getYears();
  }

  // get years form 2006
  getYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    let startYear = 2006;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }
}
