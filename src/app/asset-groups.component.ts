import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {DataService} from './data.service';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-asset-groups',
  templateUrl: './asset-groups.component.html',
  styleUrls: ['./asset-groups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetGroupsComponent implements OnInit {
  constructor(private appComponent: AppComponent, public dataService: DataService) {}

  data: Object;

  selectedGroupType: Object;
  selectedType: Object;

  group: Object;
  assets = [];
  counts = {};
  typeCounts = {};


  ngOnInit(): void {
    this.dataService.loadData().then(data => {
      this.data = data;
      this.selectedGroupType = data['assetGroupTypes'][0];
      this.updateCounts();
      this.updateTypeCounts();
    });
  }

  changeTab(groupType) {
    this.selectedGroupType = groupType;
    this.selectedType = null;
    this.updateTypeCounts();
    this.updateCounts();
  }

  setAssetType(type) {
    this.selectedType = type;
    this.updateCounts();
  }

  open(modal, group): void {
    this.group = group;
    this.assets = this.data['assets'].filter(asset => group['assets'].indexOf(asset['id']) !== -1).sort((a, b) => {
      return group['assets'].indexOf(a['id']) > group['assets'].indexOf(b['id']);
    });

    this.appComponent.cssClass = 'modal-open';
    modal.classList.add('d-block');
    setTimeout(() => modal.classList.add('show'), 20); // force this to happen after display=block
  }

  dismiss(modal): void {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.remove('d-block');
      this.appComponent.cssClass = '';
    }, 500); // force this to happen after display=block
  }

  // noinspection JSMethodCanBeStatic
  humanReadableFileSize(size: number): string {
    const byteUnits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;

    while (size > 1024) {
      size = size / 1024;
      i++;
    }

    return Math.max(size, 0.1).toFixed(1) + ' ' + byteUnits[i];
  }

  updateCounts() {
    const assetGroups = this.data['assetGroups'];

    for (let i = 0; i < assetGroups.length; i++) {
      const group = assetGroups[i];
      this.counts[group['id']] = this.data['assets'].filter(asset => {
        return group['assets'].indexOf(asset['id']) !== -1 && (!this.selectedType || asset['tags'].indexOf(this.selectedType['id']) !== -1);
      }).length;
    }
  }

  updateTypeCounts() {
    const assetTypes = this.data['assetTypes'];
    const assetGroups = this.data['assetGroups'];

    for (let i = 0; i < assetTypes.length; i++) {
      const type = assetTypes[i];
      this.typeCounts[type['id']] = this.data['assets'].filter(asset => {
        const group = assetGroups.find(item => item['assets'].indexOf(asset['id']) !== -1);
        return asset['tags'].indexOf(type['id']) !== -1 && group['tags'].indexOf(this.selectedGroupType['id']) !== -1;
      }).length;
    }

    this.typeCounts['all'] = this.data['assets'].filter(asset => {
      const group = assetGroups.find(item => item['assets'].indexOf(asset['id']) !== -1);
      return group['tags'].indexOf(this.selectedGroupType['id']) !== -1;
    }).length;
  }

  download(asset) {
    this.dataService.download(asset['videoUrl'] ? asset['videoUrl'] : asset['url']);
  }
}
