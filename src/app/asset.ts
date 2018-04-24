export class Asset {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public dateAdded: Date,
    public url: string,
    public tags: string[],
    public type: string,
    public size: number,
    public color: string,
    public thumbnailUrl: string,
    public thumbnailSize: number,
    public thumbnailVideoUrl: string,
    public thumbnailVideoSize: string
  ) { }
}
