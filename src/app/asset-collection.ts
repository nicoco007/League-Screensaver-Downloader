import {Asset} from './asset';
import {AssetType} from './asset-type';
import {FilterableCollection} from './filterable-collection';

export class AssetCollection implements FilterableCollection {
  private _assets: Asset[];
  private _cache: Map<string, AssetCollection> = new Map<string, AssetCollection>();

  constructor(assets: Asset[] = []) {
    this._assets = assets;
  }

  public add(asset: Asset): void {
    this._assets.push(asset);
  }

  public concat(assets: Asset[]): void {
    this._assets = this._assets.concat(assets);
  }

  public type(type: AssetType): AssetCollection {
    if (!type) {
      return this;
    }

    if (this._cache.has(type.id)) {
      return this._cache.get(type.id);
    }

    const assets = [];

    for (const asset of this._assets) {
      if (asset.tags.indexOf(type.id) !== -1) {
        assets.push(asset);
      }
    }

    const assetCollection = new AssetCollection(assets);

    this._cache.set(type.id, assetCollection);

    return assetCollection;
  }

  public size() {
    return this._assets.length;
  }

  public toArray() {
    return this._assets;
  }
}
