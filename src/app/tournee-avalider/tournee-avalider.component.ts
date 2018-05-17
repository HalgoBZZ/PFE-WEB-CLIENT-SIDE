import { Component, OnInit } from '@angular/core';
import { TourneeService } from '../services/tournee.service';
import { Tournee } from '../models/tournee';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tournee-avalider',
  templateUrl: './tournee-avalider.component.html',
  styleUrls: ['./tournee-avalider.component.css']
})
export class TourneeAvaliderComponent implements OnInit {

  private avalider:any;
  constructor(private tourneeService:TourneeService, private storage:StorageService) { }

  ngOnInit() {
    this.getTournees();
  }

  public getTournees() {
    this.tourneeService.getAvalider()
    .subscribe(
      data => {
        this.avalider = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  enreg(tournee:Tournee){
    this.storage.saveInLocal('tournee',tournee.tour_ID);
   }

}
