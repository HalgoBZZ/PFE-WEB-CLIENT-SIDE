import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReleve',
  pure: false
})

@Injectable()
export class FilterRelevePipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(it=>{   
            const equ_ID = it.equ_ID.toString().toLowerCase().includes(value.toLowerCase()) 
            const rele_COMMENT = it.rele_COMMENT.toString().toLowerCase().includes(value.toLowerCase()) 
            const rele_DT = it.rele_DT.toString().toLowerCase().includes(value.toLowerCase()) 
            const rele_CREDT = it.rele_CREDT.toString().toLowerCase().includes(value.toLowerCase()) 
            const rele_UPDTDT = it.rele_UPDTDT.toString().toLowerCase().includes(value.toLowerCase())
            return (equ_ID + rele_COMMENT + rele_DT + rele_CREDT + rele_UPDTDT);      
        }) 
    }
}