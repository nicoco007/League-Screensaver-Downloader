import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'id',
  pure: false
})
export class IdFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any[] {
    if (!value || !args) {
      return args;
    }

    return value.filter(item => item['id'] === args[0])[0];
  }
}
