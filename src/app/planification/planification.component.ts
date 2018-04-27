import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,NgForm, FormGroup, Validators } from "@angular/forms";
import { Planification } from '../models/planification';
import { PlanificationService } from '../services/planification.service';
import { Router } from '@angular/router';

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
  planifications:any;
  planificationForm:FormGroup;

  constructor(private modalService: NgbModal, 
    private planificationService: PlanificationService, private router: Router) { 

    }

  ngOnInit() {
    this.getPlanifications();
    //this.compareTwoDates();
    this.planificationForm = new FormGroup({
      planif_NAME: new FormControl('', Validators.required),
      planif_STATE: new FormControl('', Validators.required),
      planif_HOUR: new FormControl('', Validators.required),
      planif_DAY:new FormControl('', Validators.required),
      planif_TYPE :new FormControl('', Validators.required),
      planif_DEBDT:new FormControl('', Validators.required),
      planif_ENDDT:new FormControl('', Validators.required),
      secteur: new FormControl('', Validators.required)
    })
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

  public onSubmit() {
    if (this.planificationForm.valid) {
    let newPlanif=new Planification(this.planificationForm.controls['planif_NAME'].value,
    this.planificationForm.controls['planif_ENDDT'].value,
    this.planificationForm.controls['planif_DEBDT'].value,
    this.planificationForm.controls['planif_HOUR'].value,
    this.planificationForm.controls['planif_DAY'].value,
    this.planificationForm.controls['planif_TYPE'].value,
    this.planificationForm.controls['planif_STATE'].value,
    new Date(), new Date(),
    this.planificationForm.controls['secteur'].value);
    this.planificationService.createPlanification(newPlanif);

    this.getPlanifications();
   location.reload
    }
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

  compareTwoDates(){
    if(new Date(this.planificationForm.controls['fin'].value)<new Date(this.planificationForm.controls['debut'].value)){
       return false;
    }
    return true;
  }
}
