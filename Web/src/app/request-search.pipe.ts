import { Pipe, PipeTransform } from '@angular/core';
import {Device} from "./device";

@Pipe({
  name: 'requestSearch',
  pure: false
})
export class LendingSearchPipe implements PipeTransform {

  transform(items: any[], filter: string[]): any {
        if(filter == null) return items;



        return items && items.filter(item => {
            if(item.user.name && item.device.name) {



                for(let i in filter) {
                    let fil = filter[i].toLowerCase();

                    if (item.user.name.toLowerCase().indexOf(fil) != -1
                        || item.device.name.toLowerCase().indexOf(fil) != -1
                        || Device.stringInTags(item.device.tags, fil)) {}
                    else{
                        return false;
                    }
                }
                return true;


            }


            return false;

        });

  }

}
