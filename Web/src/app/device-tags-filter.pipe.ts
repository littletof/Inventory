import { Pipe, PipeTransform } from '@angular/core';
import {Device} from "./device";

@Pipe({
  name: 'deviceTagsFilter',
  pure: false
})
export class DeviceTagsFilterPipe implements PipeTransform {

  transform(items: any[], chips: string[]): any {


      let filter:string[] = [];
      chips&& chips.forEach(chip=> filter.push(chip));


      //console.log(filter);

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

            if(filter[ftag]) {
                let searchTag = filter[ftag].toUpperCase();

                //console.log('check ', searchTag, ' in ', item.name, ' result:  ', item.name.indexOf(searchTag));

                /*tags.indexOf(searchTag) != -1*/
                if (Device.stringInTags(item.tags, searchTag) || item.name.toUpperCase().indexOf(searchTag) != -1) {}
                else{
                    return false;
                }
            }
          }

          return true;
      });
  }

}
