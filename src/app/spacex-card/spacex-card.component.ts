import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpaceXCardSevice } from './spaceX-card-service';

@Component({
  selector: 'app-spacex-card',
  templateUrl: './spacex-card.component.html',
  styleUrls: ['./spacex-card.component.scss'],
  providers: [SpaceXCardSevice]
})

export class SpacexCardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: SpaceXCardSevice) { }
  spaceXData = [];
  @Output() emitLoaderStarter: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
        this.showSpaceXData(param);
    });
  }

  showSpaceXData(param) {
    this.emitLoaderStarter.emit(true);
    this.service.getSpaceXData(param)
      .subscribe((data: []) => {
        this.emitLoaderStarter.emit(false);
        // console.log("Test for Custom rules"); // Test For custom rules
        this.spaceXData = data.slice();
      });
  }

}
