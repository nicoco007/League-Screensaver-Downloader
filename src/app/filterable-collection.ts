import {AssetType} from './asset-type';
import {Asset} from './asset';

export interface FilterableCollection {
  size(): number;
  toArray(): Asset[];
  type(type: AssetType): FilterableCollection;
  tag(tag: string): FilterableCollection;
}
