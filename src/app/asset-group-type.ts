import {Translatable} from './translatable';
import {AssetGroup} from './asset-group';

export class AssetGroupType implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public assetGroups: AssetGroup[],
    public showAlphabet: boolean,
    public hidden: boolean
  ) { }
}
