import { Component, OnInit } from '@angular/core';
import { ReleveService } from '../services/releve.service';
import { Releve } from '../models/releve';
import { StorageService } from '../services/storage.service';
import { Pdl } from '../models/pdl';
import { PdlService } from '../services/pdl.service';

@Component({
  selector: 'app-releve',
  templateUrl: './releve.component.html',
  styleUrls: ['./releve.component.css']
})
export class ReleveComponent implements OnInit {

  private val:number;
  private pdl:Pdl;
  private releves:any;
  constructor(private releveService:ReleveService, private storage:StorageService,private pdlService:PdlService) { }

  ngOnInit() {
    this.pdl=new Pdl();
    this.val=parseInt(localStorage.getItem('pdl'));
    this.getReleves(this.val);
    this.getPdl();
  }
  public getReleves(id:number) {
    this.releveService.getByPdl(id)
    .subscribe(
      data => {
        this.releves = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getPdl(){
    this.pdlService.getPdl(this.val)
    .subscribe(
      data => {
        this.pdl = data;
      },
      err => {
        console.log(err);
      }
 
    );
  }

  viderstockage(){
    localStorage.removeItem('pdl');
  }

  enreg(releve:Releve){
    this.storage.saveInLocal('releve',releve.rele_ID);
   }
 

}
