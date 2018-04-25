import {AssetGroup} from './asset-group';
import {Asset} from './asset';
import {AssetType} from './asset-type';
import {AssetCollection} from './asset-collection';
import {FilterableCollection} from './filterable-collection';

export class AssetGroupCollection implements FilterableCollection {
  public readonly assetGroups: AssetGroup[];
  private _assets: Asset[] = [];
  private _cache: Map<string, AssetCollection> = new Map<string, AssetCollection>();

  constructor(assetGroups: AssetGroup[] = []) {
    this.assetGroups = assetGroups;

    for (const assetGroup of assetGroups) {
      this._assets = this._assets.concat(assetGroup.assets.toArray());
    }
  }

  public add(assetGroup: AssetGroup): void {
    this.assetGroups.push(assetGroup);
    this._assets = this._assets.concat(assetGroup.assets.toArray());
  }

  public toArray() {
    return this._assets;
  }

  public size() {
    return this._assets.length;
  }

  public type(type: AssetType): AssetCollection {
    if (!type) {
      return new AssetCollection(this._assets);
    }

    return this.tag(type.id);
  }

  public tag(tag: string): AssetCollection {
    if (!tag) {
      return new AssetCollection(this._assets);
    }

    if (this._cache.has(tag)) {
      return this._cache.get(tag);
    }

    const assets = [];

    for (const asset of this._assets) {
      if (asset.tags.indexOf(tag) !== -1) {
        assets.push(asset);
      }
    }

    const collection = new AssetCollection(assets);

    this._cache.set(tag, collection);

    return collection;
  }
}
