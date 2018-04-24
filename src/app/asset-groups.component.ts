import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {DataService} from './data.service';
import {AppComponent} from './app.component';
import {Tab} from './tab';
import {Collection} from './collection';
import {Asset} from './asset';

@Component({
  selector: 'app-asset-groups',
  templateUrl: './asset-groups.component.html',
  styleUrls: ['./asset-groups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetGroupsComponent implements OnInit {
  constructor(private appComponent: AppComponent, public dataService: DataService) {}

  data: Object;
  tabs: Tab[];

  selectedType: Object;
  selectedTab: Tab;

  private _assets: Map<string, Asset> = new Map<string, Asset>();
  private _assetsByTag: Map<string, Asset[]> = new Map<string, Asset[]>();
  private _collections: Map<string, Collection> = new Map<string, Collection>();

  public get collections() {
    return Array.from(this._collections.values());
  }

  group: Object;
  collection: Collection;
  counts = {};
  typeCounts = {};
  selectedAssets: Asset[];

  ngOnInit(): void {
    this.dataService.loadData().then(data => {
      if (data) {
        try {
          this.loadData(data);
        } catch (ex) {
          console.log(ex);
        }
      }
    });
  }

  loadData(data) {
    this.data = data;

    this.tabs = [];
    this.tabs.push(new Tab('collections', 'Collections', 'custom'));

    for (const groupType of data['assetGroupTypes']) {
      this.tabs.push(new Tab(groupType['id'], this.dataService.translate(groupType['nameTranslateId']), 'assetGroup'));
    }

    this.selectedTab = this.tabs[0];

    this.selectedAssets = [];

    this.loadAssets(data);
    this.loadCollections(data);
  }

  private loadAssets(data) {
    for (const obj of data['assets']) {
      const asset = new Asset(
        obj['id'],
        obj['nameTranslateId'],
        new Date(obj['dateAdded']),
        obj['url'],
        obj['tags'],
        obj['type'],
        obj['size'],
        obj['color'],
        obj['thumbnailUrl'],
        obj['thumbnailSize'],
        obj['thumbnailVideoUrl'] || null,
        obj['thumbnailVideoSize'] || null
      );

      this._assets.set(asset.id, asset);

      for (const tag of asset.tags) {
        if (!this._assetsByTag.has(tag)) {
          this._assetsByTag.set(tag, []);
        }

        this._assetsByTag.get(tag).push(asset);
      }
    }
  }

  private loadCollections(data) {
    for (const collection of data['collections']['collections']) {
      let collectionAssets = [];

      if (collection['tags']) {
        for (const tag of collection['tags']) {
          const assets = this._assetsByTag.get(tag);
          collectionAssets = collectionAssets.concat(assets);
        }
      }

      this._collections.set(collection['id'], new Collection(
        collection['id'],
        collection['nameTranslateId'],
        this._assets.get(collection['coverAssetId']),
        collection['categories'],
        collection['tags'],
        collectionAssets,
        false
      ));
    }
  }

  changeTab(tab) {
    this.selectedTab = tab;
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

    this.selectedAssets = this.data['assets'].filter(asset => group['assets'].indexOf(asset['id']) !== -1).sort((a, b) => {
      return group['assets'].indexOf(a['id']) > group['assets'].indexOf(b['id']);
    });

    this.appComponent.cssClass = 'modal-open';
    modal.classList.add('d-block');
    setTimeout(() => modal.classList.add('show'), 20); // force this to happen after display=block
  }

  showCollection(modal, collection: Collection) {
    this.collection = collection;
    this.selectedAssets = collection.assets;

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
        return asset['tags'].indexOf(type['id']) !== -1 && group['tags'].indexOf(this.selectedTab.id) !== -1;
      }).length;
    }

    this.typeCounts['all'] = this.data['assets'].filter(asset => {
      const group = assetGroups.find(item => item['assets'].indexOf(asset['id']) !== -1);
      return group['tags'].indexOf(this.selectedTab.id) !== -1;
    }).length;
  }

  download(asset) {
    this.dataService.download(asset['videoUrl'] ? asset['videoUrl'] : asset['url']);
  }
}
