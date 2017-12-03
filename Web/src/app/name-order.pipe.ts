import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameOrder'
})
export class NameOrderPipe implements PipeTransform {

  transform(items: any[], args?: any): any {


      if(!items){
          return items;
      }

      return items.sort((a, b) => {return a.name.localeCompare(b.name);});

  }

}


