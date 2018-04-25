import {Translatable} from './translatable';
import {AssetCollection} from './asset-collection';

export class AssetGroup implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public previewUrl: string,
    public dateAdded: Date,
    public assets: AssetCollection,
    public tags: string[],
    public previewThumbnailUrl: string,
    public previewThumbnailSize: string
  ) { }
}
