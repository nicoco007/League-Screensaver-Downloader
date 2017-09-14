import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, animate, transition, query} from '@angular/animations';

import {DataService} from './data.service';

@Component({
  selector: 'app-asset-groups',
  templateUrl: './asset-groups.component.html',
  styleUrls: ['./asset-groups.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('paneState', [
      state('active', style({
        opacity: 1,
        display: 'block'
      })),
      state('inactive', style({
        opacity: 0,
        display: 'none'
      })),
      transition('inactive => active', animate('300ms ease')),
      transition('active => inactive', animate('300ms ease'))
    ])
  ]
})
export class AssetGroupsComponent implements OnInit {
  constructor(public dataService: DataService) {}

  data: Object;
  activeId: string;

  ngOnInit(): void {
    this.dataService.loadData().then(data => {
      this.data = data;
    });
  }

  select(tabId): void {
    console.log(tabId);
    this.activeId = tabId;
  }
}
