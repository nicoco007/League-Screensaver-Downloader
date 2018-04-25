import {Asset} from './asset';
import {Translatable} from './translatable';
import {AssetCollection} from './asset-collection';

export class Collection implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public cover: Asset,
    public categories: string[],
    public tags: string[],
    public assets: AssetCollection
  ) { }
}
