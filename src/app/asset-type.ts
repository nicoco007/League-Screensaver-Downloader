import {Translatable} from './translatable';
import {AssetCollection} from './asset-collection';

export class AssetType implements Translatable {
  constructor(public id: string, public nameTranslateId: string, public assets: AssetCollection) { }
}
