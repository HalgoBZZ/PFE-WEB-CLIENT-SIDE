import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPdl',
  pure: false
})

@Injectable()
export class FilterPdlPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(it=>{   
            const pdl_REFE = it.pdl_REFE.toString().toLowerCase().includes(value.toLowerCase()) 
            const pdl_COMMENT = it.pdl_COMMENT.toString().toLowerCase().includes(value.toLowerCase()) 
            const pdl_ROUTERORDER = it.pdl_ROUTERORDER.toString().toLowerCase().includes(value.toLowerCase()) 
            const pdl_NEEDRDV = it.pdl_NEEDRDV.toString().toLowerCase().includes(value.toLowerCase()) 
            const pdl_ADRESS = it.pdl_ADRESS.toString().toLowerCase().includes(value.toLowerCase())
            const pdl_DIFFREAD = it.pdl_DIFFREAD.toString().toLowerCase().includes(value.toLowerCase())   
            const pdl_CREDT = it.pdl_CREDT.toString().toLowerCase().includes(value.toLowerCase())
            const pdl_UPDTDT = it.pdl_UPDTDT.toString().toLowerCase().includes(value.toLowerCase())
            const pdl_ACCESS = it.pdl_ACCESS.toString().toLowerCase().includes(value.toLowerCase())  
           return (pdl_REFE + pdl_COMMENT + pdl_ROUTERORDER + pdl_NEEDRDV + pdl_ADRESS + pdl_DIFFREAD + pdl_CREDT + pdl_UPDTDT + pdl_ACCESS);      
        }) 
    }
}