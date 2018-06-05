import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponsableService } from '../services/responsable.service';
import { Router } from '@angular/router';
import { Responsable } from '../models/responsable';
import { LoaderService } from '../services/loading.service';
import { FilterRespPipe } from '../pipes/filter-resp.pipe';


@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.css'],
  providers: [ResponsableService]
})
export class ResponsableListComponent implements OnInit {
  closeResult: string;
  responsables:any;
  private showLoader:boolean;
  private url = '';
  private file: File=null;
  private newRes:Responsable;

  constructor(private modalService: NgbModal, 
  private responsableService:ResponsableService, private router:Router, 
  private loaderService : LoaderService,
  private filtre:FilterRespPipe) { }

  ngOnInit() {
    this.newRes=new Responsable();
    this
      .loaderService
      .status
      .subscribe((val : boolean) => {
        this.showLoader = val;
      });
    this.getResponsables();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getResponsables() {
    this.responsableService.getResponsables().subscribe(
      responsables => {
        this.responsables = responsables;
      },
      err => {
        console.log(err);
      }
 
    );
  }

  save(){
    this.newRes.cmpt_CREDT=new Date();
    this.newRes.cmpt_UPDTDT=new Date();
    this.responsableService.createResponsable(this.newRes);
    location.reload();
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    this.file = files[0];

    if (files && this.file) {
      var reader = new FileReader();

      reader.onload = this
        .handleReaderLoaded
        .bind(this);
     this.newRes.cmpt_PIC= reader.readAsBinaryString(this.file);
     var reader2 = new FileReader();
     var file2 = <File>evt.target.files[0];
      reader2.readAsDataURL(file2); // read file as data url
      reader2.onload = (evt) => { // called once readAsDataURL is completed
        this.url = reader2.result;
      }
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.newRes.cmpt_PIC = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file = <File>event.target.files[0];
      reader.readAsDataURL(this.file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;       
      }
    }
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
