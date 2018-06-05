import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMesure',
  pure: false
})

@Injectable()
export class FilterMesurePipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(it=>{   
            const mesu_CAD_NAME = it.mesu_CAD_NAME.toString().toLowerCase().includes(value.toLowerCase()) 
            const mesu_CAD_CODE = it.mesu_CAD_CODE.toString().toLowerCase().includes(value.toLowerCase()) 
            const mesu_CAD_INDEX = it.mesu_CAD_INDEX.toString().toLowerCase().includes(value.toLowerCase()) 
            const mesu_CAD_CREDT = it.mesu_CAD_CREDT.toString().toLowerCase().includes(value.toLowerCase()) 
            const mesu_CAD_UPDTDT = it.mesu_CAD_UPDTDT.toString().toLowerCase().includes(value.toLowerCase())
            return (mesu_CAD_NAME + mesu_CAD_CODE + mesu_CAD_INDEX + mesu_CAD_CREDT + mesu_CAD_UPDTDT);      
        }) 
    }
}