import { Component, OnInit } from '@angular/core';
import { PdlService } from '../services/pdl.service';
import { StorageService } from '../services/storage.service';
import { Pdl } from '../models/pdl';
import { TourneeService } from '../services/tournee.service';
import { Tournee } from '../models/tournee';

@Component({
  selector: 'app-pdl',
  templateUrl: './pdl.component.html',
  styleUrls: ['./pdl.component.css']
})
export class PdlComponent implements OnInit {

  private val:number;
  private pdls:Pdl[];
  private tour:Tournee;
  constructor(private pdlService:PdlService,
    private storage:StorageService,
    private tourService:TourneeService) { }

  ngOnInit() {
    this.pdls=new Array<Pdl>();
    this.val=parseInt(localStorage.getItem('tournee'));
    this.getPdls(this.val);
    this.tour=new Tournee();
    this.getTournee();
  }


  public getPdls(id:number) {
    this.pdlService.getByTournee(id)
    .subscribe(
      data => {
        this.pdls = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  viderstockage(){
    localStorage.removeItem('tournee');
  }
  getTournee(){
    this.tourService.getTournee(parseInt(localStorage.getItem('tournee')))
    .subscribe(
      data => {
        this.tour = data;
      },
      err => {
        console.log(err);
      }
 
    );
  }
  enreg(pdl:Pdl){
    // localStorage.setItem('tournee',tournee.tour_ID);
    this.storage.saveInLocal('pdl',pdl.pdl_ID);
   }
 
}
