import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {DataService} from './data.service';

@Component({
  selector: 'app-asset-groups',
  templateUrl: './asset-groups.component.html',
  styleUrls: ['./asset-groups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetGroupsComponent implements OnInit {
  constructor(public dataService: DataService) {}

  data: Object;

  ngOnInit(): void {
    this.dataService.loadData().then(data => {
      this.data = data;
    });
  }
}
