import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
title = 'SapientSpaceXSSRResponsiveAssignment';
  constructor(private titleService: Title, private metaService: Meta) { }
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'description', content: 'Responsive and server side rendered app' },
      { name: 'author', content: 'Siddharth Mishra' },
      { name: 'date', content: '2020-09-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
  }
}
