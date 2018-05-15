import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,NgForm, FormGroup, Validators } from "@angular/forms";
import { Planification } from '../models/planification';
import { PlanificationService } from '../services/planification.service';
import { Router } from '@angular/router';
import { SecteurService } from '../services/secteur.service';
import { Secteur } from '../models/secteur';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css'],
  providers: [PlanificationService]
})
export class PlanificationComponent implements OnInit {
  closeResult: string;
  private planification:Planification;
  private planificationup:Planification;
  private planifications:any;
  private secteurs:any;
  private secteur:Secteur;


  constructor(private modalService: NgbModal, 
    private planificationService: PlanificationService, 
    private router: Router,private secteurService:SecteurService) { 

    }

  ngOnInit() {
    this.getSecteurs();
    this.getPlanifications();
    this.secteur=new Secteur();
    this.planification=new Planification();
    //this.planificationup=new Planification();
  }

  public getPlanifications() {
    this.planificationService.getPlanifications().subscribe(
      planifications => {
        this.planifications = planifications;
      },
      err => {
        console.log(err);
      }
 
    );
  }
  public getSecteurs(){
    this.secteurService.getSecteurs().subscribe(
      data => {
        this.secteurs=data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  public onSubmit() {
    //this.getSecteur(this.secteur.sec_ID);
    this.planification.planif_CREDT=new Date();
    this.planification.planif_UPDTDT=new Date();
    this.planificationService.createPlanification(this.planification);
    location.reload();
  }

  public updatePlanification(planificationup: Planification):void{
    planificationup.planif_UPDTDT=new Date();
    this.planificationService.updatePlanification(planificationup);
    this.getPlanifications();
    location.reload();
  }

  public deletePlanification(planification: Planification):void{
    this.planificationService.deletePlanification(planification).subscribe(
      res => {
        this.getPlanifications();
        location.reload();
      });
  }

  public getSecteur(id:number){
    this.secteurService.getSecteur(id).subscribe(
      data => {
        this.planification.secteur=data;
      },
      err =>{
        console.log(err);
      }
    )
  }
  
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public openforUpdate(content,pl:Planification) {
    this.planificationup= pl;
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
