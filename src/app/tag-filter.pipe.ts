import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tagfilter',
  pure: false
})
export class TagFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any[] {
    if (!value || !args) {
      return args;
    }

    console.log(args);

    return value.filter(item => item['tags'].indexOf(args[0]) !== -1);
  }
}
