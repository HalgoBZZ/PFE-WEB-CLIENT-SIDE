import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTour',
  pure: false
})

@Injectable()
export class FilterTourPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(it=>{   
            const pere=it.pere.tour_NAME.toString().toLowerCase().includes(value.toLowerCase())
            const tour_CODE = it.tour_CODE.toString().toLowerCase().includes(value.toLowerCase()) 
            const tour_NAME = it.tour_NAME.toString().toLowerCase().includes(value.toLowerCase()) 
            const tour_COMMENT = it.tour_COMMENT.toString().toLowerCase().includes(value.toLowerCase()) 
            const tour_CREDT = it.tour_CREDT.toString().toLowerCase().includes(value.toLowerCase()) 
            const tour_UPDTDT = it.tour_UPDTDT.toString().toLowerCase().includes(value.toLowerCase())
            const tour_STATE = it.tour_STATE.toString().toLowerCase().includes(value.toLowerCase())   
            const tour_AFFDT = it.tour_AFFDT.toString().toLowerCase().includes(value.toLowerCase())
            const tour_PREVDT = it.tour_PREVDT.toString().toLowerCase().includes(value.toLowerCase())
            const secteur = it.secteur.sec_NAME.toString().toLowerCase().includes(value.toLowerCase())  
            const cmpt_FIRST_NAME = it.releveur.cmpt_FIRST_NAME.toString().toLowerCase().includes(value.toLowerCase())
            const cmpt_LAST_NAME = it.releveur.cmpt_LAST_NAME.toString().toLowerCase().includes(value.toLowerCase())
            return (pere + tour_CODE + tour_NAME + tour_COMMENT + tour_CREDT + tour_UPDTDT + tour_STATE + tour_AFFDT + tour_PREVDT + cmpt_FIRST_NAME + cmpt_LAST_NAME + secteur);      
        }) 
    }
}