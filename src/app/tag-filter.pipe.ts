import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tag',
  pure: false
})
export class TagFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any[] {
    if (!value || !args || args[0] === null) {
      return value;
    }

    return value.filter(item => {
      return item['tags'].indexOf(args[0]) !== -1;
    });
  }
}
