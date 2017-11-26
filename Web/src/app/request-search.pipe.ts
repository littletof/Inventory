import { Pipe, PipeTransform } from '@angular/core';
import {Device} from "./device";

@Pipe({
  name: 'requestSearch',
  pure: false
})
export class LendingSearchPipe implements PipeTransform {

  transform(items: any[], filterS: string): any {
        if(filterS == null) return items;

        let filter = filterS.toLowerCase().split(" ");

        return items && items.filter(item => {
            if(item.user.name && item.device.name) {



                for(let i in filter) {
                    let fil = filter[i];

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
