import {Asset} from './asset';
import {Translatable} from './translatable';

export class Collection implements Translatable {
  constructor(
    public id: string,
    public nameTranslateId: string,
    public cover: Asset,
    public categories: string[],
    public tags: string[],
    public assets: Asset[],
    public featured: boolean) { }
}
