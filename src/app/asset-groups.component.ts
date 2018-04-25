import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {DataService} from './data.service';
import {AppComponent} from './app.component';
import {Tab} from './tab';
import {Collection} from './collection';
import {Asset} from './asset';
import {Translatable} from './translatable';
import {AssetGroup} from './asset-group';
import {AssetCollection} from './asset-collection';
import {AssetGroupType} from './asset-group-type';
import {AssetType} from './asset-type';
import {AssetGroupCollection} from './asset-group-collection';
import {FilterableCollection} from './filterable-collection';

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

  selectedGroupType: FilterableCollection;
  selectedType: AssetType;
  selectedTab: Tab;

  private _assets: Map<string, Asset> = new Map<string, Asset>();
  private _assetTypes: Map<string, AssetType> = new Map<string, AssetType>();
  private _assetsByTag: Map<string, Asset[]> = new Map<string, Asset[]>();
  private _assetGroups: Map<string, AssetGroup> = new Map<string, AssetGroup>();
  private _assetGroupTypes: Map<string, AssetGroupType> = new Map<string, AssetGroupType>();
  private _collections: Map<string, Collection> = new Map<string, Collection>();

  public get assetTypes(): AssetType[] {
    return Array.from(this._assetTypes.values());
  }

  public get assetGroups(): AssetGroup[] {
    return Array.from(this._assetGroups.values());
  }

  public get assetGroupTypes(): AssetGroupType[] {
    return Array.from(this._assetGroupTypes.values());
  }

  public get collections(): Collection[] {
    return Array.from(this._collections.values());
  }

  selectedGroup: Translatable;
  selectedAssets: Asset[] = [];

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

    this.loadAssetTypes(data);
    this.loadAssets(data);
    this.loadAssetGroupTypes(data);
    this.loadAssetGroups(data);
    this.loadCollections(data);

    this.loadTabs();
  }

  private loadTabs() {
    this.tabs = [];
    this.tabs.push(new Tab('collections', 'Collections', 'custom'));

    for (const groupType of this.assetGroupTypes) {
      if (groupType.hidden === false) {
        this.tabs.push(new Tab(groupType.id, this.dataService.translate(groupType.nameTranslateId), 'assetGroupType'));
      }
    }

    this.selectedTab = this.tabs[0];
  }

  private loadAssetTypes(data) {
    for (const obj of data['assetTypes']) {
      this._assetTypes.set(obj['id'], new AssetType(
        obj['id'],
        obj['nameTranslateId'],
        new AssetCollection()
      ));
    }
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
        if (this._assetTypes.has(tag)) {
          this._assetTypes.get(tag).assets.add(asset);
        }

        if (!this._assetsByTag.has(tag)) {
          this._assetsByTag.set(tag, []);
        }

        this._assetsByTag.get(tag).push(asset);
      }
    }
  }

  private loadAssetGroupTypes(data) {
    for (const obj of data['assetGroupTypes']) {
      this._assetGroupTypes.set(obj['id'], new AssetGroupType(
        obj['id'],
        obj['nameTranslateId'],
        new AssetGroupCollection(),
        obj['showAlphabet'] || false,
        obj['hidden'] || false
      ));
    }
  }

  private loadAssetGroups(data) {
    for (const obj of data['assetGroups']) {
      const assets = new AssetCollection();

      for (const assetId of obj['assets']) {
        assets.add(this._assets.get(assetId));
      }

      const assetGroup = new AssetGroup(
        obj['id'],
        obj['nameTranslateId'],
        obj['previewUrl'],
        new Date(obj['dateAdded']),
        assets,
        obj['tags'],
        obj['previewThumbnailUrl'],
        obj['previewThumbnailSize']
      );

      for (const tag of obj['tags']) {
        if (this._assetGroupTypes.has(tag)) {
          this._assetGroupTypes.get(tag).assetGroups.add(assetGroup);
        }
      }

      this._assetGroups.set(obj['id'], assetGroup);
    }
  }

  private loadCollections(data) {
    for (const collection of data['collections']['collections']) {
      const collectionAssets = new AssetCollection();

      if (collection['tags']) {
        for (const tag of collection['tags']) {
          const assets = this._assetsByTag.get(tag);
          collectionAssets.concat(assets);
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

    if (tab.type === 'assetGroupType' && this._assetGroupTypes.has(tab.id)) {
      this.selectedGroupType = this._assetGroupTypes.get(tab.id).assetGroups;
    }
  }

  showAssetGroup(modal: HTMLDivElement, group: AssetGroup): void {
    this.selectedGroup = group;
    this.selectedAssets = group.assets.toArray();

    this.displayModal(modal);
  }

  showCollection(modal: HTMLDivElement, collection: Collection) {
    this.selectedGroup = collection;
    this.selectedAssets = collection.assets.toArray();

    this.displayModal(modal);
  }

  displayModal(modal: HTMLDivElement) {
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

  download(asset) {
    this.dataService.download(asset['videoUrl'] ? asset['videoUrl'] : asset['url']);
  }
}
