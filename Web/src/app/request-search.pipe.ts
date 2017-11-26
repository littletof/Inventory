import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestSearch',
  pure: false
})
export class LendingSearchPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
        if(filter == null) return items;

        filter = filter.toLowerCase();

        return items && items.filter(item => {
            if(item.user.name && item.device.name) {
                if (item.user.name.toLowerCase().indexOf(filter) != -1 || item.device.name.toLowerCase().indexOf(filter) != -1) {
                    return true;
                }
            }


            return false;

        });

  }

}
