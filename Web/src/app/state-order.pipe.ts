import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateOrder'
})
export class LendOrderPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if(!items){
      return items;
    }

    return items.sort((a, b) => {return b.state-a.state;});
  }

}
