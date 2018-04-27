import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OperationService } from '../services/operation.service';
import { Router } from '@angular/router';
import { Operation } from '../models/operation';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
  providers: [OperationService]
})
export class HistoriqueComponent implements OnInit {

  closeResult: string;
  operations: any;

  constructor(private modalService: NgbModal, 
    private operationService:OperationService, private router:Router) { }

  ngOnInit() {
    this.getOperations();
  }

  open(content) {
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
  getOperations() {
    this.operationService.getOperations().subscribe(
      operations => {
        this.operations = operations;
      },
      err => {
        console.log(err);
      }
 
    );
  }
  deleteAll():void{
    this.operationService.deleteAll().subscribe(
      res => {
        this.getOperations();
        location.reload();
      });
  }
}
