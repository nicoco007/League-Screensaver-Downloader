import {Asset} from './asset';
import {AssetType} from './asset-type';

export class AssetCollection {
  private assets: Asset[];
  private cache: Map<string, AssetCollection> = new Map<string, AssetCollection>();

  constructor(assets: Asset[] = []) {
    this.assets = assets;
  }

  public add(asset: Asset): void {
    this.assets.push(asset);
  }

  public concat(assets: Asset[]): void {
    this.assets = this.assets.concat(assets);
  }

  public type(type: AssetType): AssetCollection {
    if (!type) {
      return this;
    }

    if (this.cache.has(type.id)) {
      return this.cache.get(type.id);
    }

    const assets = [];

    for (const asset of this.assets) {
      if (asset.tags.indexOf(type.id) !== -1) {
        assets.push(asset);
      }
    }

    const assetCollection = new AssetCollection(assets);

    this.cache.set(type.id, assetCollection);

    return assetCollection;
  }

  public toArray() {
    return this.assets;
  }
}
