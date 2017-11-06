import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceTagsFilter',
  pure: false
})
export class DeviceTagsFilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
      if (!items || !filter) {
          return items;
      }

      //console.log('filter: ', filter);
      //return items.filter(item => item.title.indexOf(filter.title) !== -1);
      return items.filter(item => {
          //console.log('check');
          let tags = [];

          for(let propName in item.tags){
              //console.log('filter ', propName);
              tags.push(propName);
          }

          for(let ftag in filter){
            //console.log(filter[ftag]);
            //console.log('check ', filter[ftag], ' in ', item.name, ' result:  ', item.name.indexOf(filter[ftag]));

            if(tags.indexOf(filter[ftag]) === -1 && item.name.indexOf(filter[ftag])===-1){
              return false;
            }
          }

          return true;
      });
  }

}
