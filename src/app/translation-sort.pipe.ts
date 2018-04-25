import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from './data.service';
import {Translatable} from './translatable';

@Pipe({
  name: 'translationSort',
  pure: false
})
export class TranslationSortPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: Translatable[], ...args: any[]): any[] {
    if (!value || !args) {
      return args;
    }

    return value.sort((a, b) => {
      const strA = this.dataService.translate(a.nameTranslateId);
      const strB = this.dataService.translate(b.nameTranslateId);

      if (!strA || !strB) {
        return 0;
      }

      return strA.localeCompare(strB);
    });
  }
}
