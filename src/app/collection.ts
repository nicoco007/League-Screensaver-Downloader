import {Asset} from './asset';

export class Collection {
  constructor(public id: string, public nameTranslateId: string, public cover: Asset, public categories: string[], public tags: string[], public assets: Asset[], public featured: boolean) {

  }
}
