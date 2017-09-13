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
      const str1 = this.dataService.translate(a['nameTranslateId']);
      const str2 = this.dataService.translate(b['nameTranslateId']);

      if (!str1 || !str2) {
        return 0;
      }

      return str1.localeCompare(str2);
    });
  }
}
