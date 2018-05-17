import { Component, OnInit } from '@angular/core';
import { MesureService } from '../services/mesure.service';
import { Releve } from '../models/releve';
import { ReleveService } from '../services/releve.service';

@Component({
  selector: 'app-mesure2',
  templateUrl: './mesure2.component.html',
  styleUrls: ['./mesure2.component.css']
})
export class Mesure2Component implements OnInit {

  private val:number;
  private releve:Releve;
  private mesures:any;
  constructor(private mesureService:MesureService, private releveService:ReleveService) { }

  ngOnInit() {
    this.val=parseInt(localStorage.getItem('releve'));
    this.getMesures(this.val);
    this.releve=new Releve();
    this.getReleve();
  }

  viderstockage(){
    localStorage.removeItem('releve');
  }

  getReleve(){
    this.releveService.getReleve(this.val)
    .subscribe(
      data => {
        this.releve = data;
      },
      err => {
        console.log(err);
      }
 
    );
  }
  public getMesures(id:number) {
    this.mesureService.getByReleve(id)
    .subscribe(
      data => {
        this.mesures = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
