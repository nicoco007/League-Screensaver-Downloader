import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, animate, transition, query} from '@angular/animations';

import {DataService} from './data.service';
import {AppComponent} from './app.component';

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
  constructor(private appComponent: AppComponent, public dataService: DataService) {}

  data: Object;
  activeId: string;
  closeResult: string;
  display = 'none';
  show = false;
  group: Object;
  assets = [];

  ngOnInit(): void {
    this.dataService.loadData().then(data => {
      this.data = data;
    });
  }

  select(tabId): void {
    console.log(tabId);
    this.activeId = tabId;
  }

  open(modal, group) {
    this.group = group;
    this.assets = [];

    for (let i = 0; i < group['assets'].length; i++) {
      this.assets.push(this.getAsset(group['assets'][i]));
    }

    this.appComponent.cssClass = 'modal-open';
    modal.classList.add('d-block');
    setTimeout(() => modal.classList.add('show'), 20); // force this to happen after display=block
  }

  getAsset(assetId) {
    return this.data['assets'].filter(asset => asset['id'] === assetId)[0];
  }

  dismiss(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.remove('d-block');
      this.appComponent.cssClass = '';
    }, 500); // force this to happen after display=block
  }
}
