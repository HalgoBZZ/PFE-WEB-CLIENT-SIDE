import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

@Injectable()
export class FilterPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        //return items.filter(singleItem => singleItem.toLowerCase().includes(value.toLowerCase()));
        return items.filter(it=>{   
            const cmpt_FIRST_NAME = it.cmpt_FIRST_NAME.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_LAST_NAME = it.cmpt_LAST_NAME.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_EMAIL = it.cmpt_EMAIL.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_SEXE = it.cmpt_SEXE.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_BIRTH = it.cmpt_EMAIL.toString().toLowerCase().includes(value.toLowerCase())
            const cmpt_PHONE = it.cmpt_PHONE.toString().toLowerCase().includes(value.toLowerCase())  
            const cmpt_LOGIN = it.cmpt_LOGIN.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_CREDT = it.cmpt_CREDT.toString().toLowerCase().includes(value.toLowerCase()) 
            const cmpt_UPDTDT = it.cmpt_UPDTDT.toString().toLowerCase().includes(value.toLowerCase()) 
            return (cmpt_FIRST_NAME + cmpt_LAST_NAME + cmpt_EMAIL + cmpt_SEXE + cmpt_BIRTH + cmpt_PHONE + cmpt_LOGIN + cmpt_CREDT + cmpt_UPDTDT );      
        }) 
    }
}