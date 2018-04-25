import {Translatable} from './translatable';
import {AssetGroupCollection} from './asset-group-collection';

export class AssetGroupType implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public assetGroups: AssetGroupCollection,
    public showAlphabet: boolean,
    public hidden: boolean
  ) { }
}
