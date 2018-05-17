import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TourneeService } from '../services/tournee.service';
import { ReleveurService } from '../services/releveur.service';
import { Tournee } from '../models/tournee';
import { Releveur } from '../models/releveur';
import { IndexedDbService } from '../services/indexed-db.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tournee-non-effectuee',
  templateUrl: './tournee-non-effectuee.component.html',
  styleUrls: ['./tournee-non-effectuee.component.css']
})
export class TourneeNonEffectueeComponent implements OnInit {

  private nonaffecter:any;
  private releveurs:any;
  private relShow:Releveur;
  private isSelected:boolean;
  closeResult:string;
  private tournee:Tournee;
  private databaseCreated:boolean;
  constructor(private modalService: NgbModal, 
    private tourneeService:TourneeService,
    private releveurService:ReleveurService,
    private indexeddbService:IndexedDbService,
    private storage:StorageService) { }

  ngOnInit() {
    this.relShow=new Releveur()
    this.getTournees();
    this.getReleveurs();
  }

  public getTournees() {
    this.tourneeService.getNonAffecter()
    .subscribe(
      data => {
        this.nonaffecter = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getReleveurs() {
    this.releveurService.getReleveurs()
    .subscribe(
      data => {
        this.releveurs = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  show($event,val) {
    //console.log(val);
    this.relShow=val;
    this.isSelected=true;
  }

  affecter(){
    this.tournee.releveur=this.relShow;
    this.tournee.tour_AFFDT=new Date();
    this.tourneeService.updateTournee(this.tournee);
    location.reload();
  }

  enreg(tournee:Tournee){
   this.storage.saveInLocal('tournee',tournee.tour_ID);
  }

  open(content,tournee:Tournee) {
    this.tournee=tournee;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
