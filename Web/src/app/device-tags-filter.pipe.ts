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

      return items.filter(item => {

          let tags = [];

          for(let propName in item.tags){
              //console.log('filter ', propName);
              tags.push(propName.toUpperCase());
          }

          for(let ftag in filter){

              let searchTag = filter[ftag].toUpperCase();

              //console.log('check ', searchTag, ' in ', item.name, ' result:  ', item.name.indexOf(searchTag));



            if(tags.indexOf(searchTag) === -1 && item.name.toUpperCase().indexOf(searchTag)===-1){
              return false;
            }
          }

          return true;
      });
  }

}
