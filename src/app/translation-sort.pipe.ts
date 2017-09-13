import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from './data.service';

@Pipe({
  name: 'translationsort',
  pure: false
})
export class TranslationSortPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: any, ...args: any[]): any[] {
    if (!value || !args) {
      return args;
    }

    console.log(args);

    return value.sort((a, b) => {
      const strA = this.dataService.translate(a['nameTranslateId']);
      const strB = this.dataService.translate(b['nameTranslateId']);

      if (!strA || !strB) {
        return 0;
      }

      return strA.localeCompare(strB);
    });
  }
}
