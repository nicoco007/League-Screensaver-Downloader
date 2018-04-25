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

    return this.tag(type.id);
  }

  public tag(tag: string): AssetCollection {
    if (!tag) {
      return this;
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

    const assetCollection = new AssetCollection(assets);

    this._cache.set(tag, assetCollection);

    return assetCollection;
  }

  public size() {
    return this._assets.length;
  }

  public toArray() {
    return this._assets;
  }
}
