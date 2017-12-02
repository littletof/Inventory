import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(items: any[], paginateData: any): any[] {
    let startIndex = paginateData.pageIndex*paginateData.pageSize;
    if(startIndex>paginateData.length){
      startIndex = paginateData.length-paginateData.pageSize;
    }
    let endIndex = startIndex + paginateData.pageSize;

    //console.log('start ',startIndex);
    //console.log(paginateData);


    return items.slice(startIndex, endIndex);
  }

}
