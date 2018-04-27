import { Component, OnInit } from '@angular/core';
import { TourneeService } from '../services/tournee.service';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  providers:[TourneeService]
})
export class PlanningComponent implements OnInit {

  tournees:any;

  constructor(private tourneeService:TourneeService){}
  ngOnInit() {
    this.getPlanning();
  }
   public getPlanning(){
    this.tourneeService.getTournees().subscribe(
      tournees => {
        this.tournees=tournees;
      },
      err => {
        console.log(err);
      }
 
    );

   }

}
