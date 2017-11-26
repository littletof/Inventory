import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lendingSearch',
  pure: false
})
export class LendingSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
