import {Translatable} from './translatable';

export class AssetGroup implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public previewUrl: string,
    public dateAdded: string, // TODO: Date
    public assets: string[], // TODO: Asset[]
    public tags: string[],
    public previewThumbnailUrl: string,
    public previewThumbnailSize: string
  ) { }
}
