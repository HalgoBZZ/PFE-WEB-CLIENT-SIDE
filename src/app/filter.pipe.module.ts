import { NgModule } from '@angular/core';
import { FilterPipe } from './pipes/filtre.pipe';
import { FilterRespPipe } from './pipes/filter-resp.pipe';
import { FilterPlanPipe } from './pipes/filter-plan.pipe';
import { FilterTourPipe } from './pipes/filter-tournee.pipe';
import { FilterPdlPipe } from './pipes/filter-pdl.pipe';
import { FilterRelevePipe } from './pipes/filter-releve.pipe';
import { FilterMesurePipe } from './pipes/filter-mesure.pipe';
import { FilterTourNAPipe } from './pipes/filter-tournee-nonaffect.pipe';



@NgModule({
  declarations: [FilterPipe,
    FilterRespPipe,
    FilterPlanPipe,
    FilterTourPipe,
    FilterPdlPipe,
    FilterRelevePipe,
    FilterMesurePipe,
    FilterTourNAPipe],
  providers: [FilterPipe, 
    FilterRespPipe,
    FilterPlanPipe,
    FilterTourPipe,
    FilterPdlPipe,
    FilterRelevePipe,
    FilterMesurePipe,
    FilterTourNAPipe],
  exports: [FilterPipe, 
    FilterRespPipe,
    FilterPlanPipe,
    FilterTourPipe,
    FilterPdlPipe,
    FilterRelevePipe,
    FilterMesurePipe,
    FilterTourNAPipe]
})

export class FilterPipeModule {}