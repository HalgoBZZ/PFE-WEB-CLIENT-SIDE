import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlan',
  pure: false
})

@Injectable()
export class FilterPlanPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return items.filter(it=>{   
            const planif_NAME = it.planif_NAME.toString().toLowerCase().includes(value.toLowerCase()) 
            const planif_STATE = it.planif_STATE.toString().toLowerCase().includes(value.toLowerCase()) 
            const planif_DAY = it.planif_DAY.toString().toLowerCase().includes(value.toLowerCase()) 
            const planif_TYPE = it.planif_TYPE.toString().toLowerCase().includes(value.toLowerCase()) 
            const planif_DEBDT = it.planif_DEBDT.toString().toLowerCase().includes(value.toLowerCase())
            const planif_ENDDT = it.planif_ENDDT.toString().toLowerCase().includes(value.toLowerCase())   
            const sec_NAME = it.secteur.sec_NAME.toString().toLowerCase().includes(value.toLowerCase())  
            return (planif_NAME + planif_STATE + planif_DAY + planif_TYPE + planif_DEBDT + planif_ENDDT + sec_NAME );      
        }) 
    }
}