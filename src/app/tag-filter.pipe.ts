import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tag',
  pure: false
})
export class TagFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any[] {
    if (args[0] === null || !value || !args) {
      return value;
    }

    return value.filter(item => {
      if (!item.hasOwnProperty('tags')) {
        console.warn(item + ' does not have tags!');
        return true;
      }

      return item['tags'].indexOf(args[0]) !== -1;
    });
  }
}
