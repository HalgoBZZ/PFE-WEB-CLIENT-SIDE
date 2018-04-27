import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReleveurService } from '../services/releveur.service';
import { Releveur } from '../models/releveur';
import { Router } from '@angular/router';
import { Responsable } from '../models/responsable';
import { UploadImageService } from '../services/upload-image.service';
import { LoaderService } from '../services/loading.service';

@Component({
  selector: 'app-releveur-list',
  templateUrl: './releveur-list.component.html',
  styleUrls: ['./releveur-list.component.css'],
  providers: [ReleveurService]
})
export class ReleveurListComponent implements OnInit {
   private closeResult: string;
   private releveurs:any;
   private releveurForm: FormGroup;
   private showLoader : boolean;
   private releveurup:Releveur;
   private newRel:Releveur;
   
   private url = '';
   private file: File=null;
   private releveurAdded:boolean;
   private responsable:Responsable;
   private valeur:any;
  constructor(private modalService: NgbModal,
    private releveurService: ReleveurService, 
    private router:Router, private uploadImageService:UploadImageService, private loaderService : LoaderService) { 
    }

  ngOnInit() {
    this.newRel=new Releveur();
    this
      .loaderService
      .status
      .subscribe((val : boolean) => {
        this.showLoader = val;
      });
    this.getReleveurs();
    this.releveurAdded=false;    
  }
  
  save(){
    this.newRel.cmpt_CREDT=new Date();
    this.newRel.cmpt_UPDTDT=new Date();
    this.releveurService.createReleveur(this.newRel);
    location.reload();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openforUpdate(content,rel:Releveur) {
    this.releveurup= rel;
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

  updateReleveur(releveurup:Releveur):void{
    this.releveurService.updateReleveur(releveurup);
    this.getReleveurs();
    location.reload();
  }

  getReleveurs() {
    this.releveurService.getReleveurs().subscribe(
      releveurs => {
        this.releveurs = releveurs;
      },
      err => {
        console.log(err);
      }
 
    );
  }

  deleteReleveur(releveur:Releveur):void{
    this.releveurService.deleteReleveur(releveur).subscribe(
      res => {
        this.getReleveurs();
        this.router.navigate(['/releveurs']);
      });
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
     this.newRel.cmpt_PIC= reader.readAsBinaryString(this.file);
     var reader2 = new FileReader();
     var file2 = <File>evt.target.files[0];
      reader2.readAsDataURL(file2); // read file as data url
      reader2.onload = (evt) => { // called once readAsDataURL is completed
        this.url = reader2.result;
      }
    }
  }

  handleFileSelectUp(evt) {
    var files = evt.target.files;
    var file1 = files[0];
    if (files && file1) {
      var reader = new FileReader();

      reader.onload = this
        .handleReaderLoadedUp
        .bind(this);
     this.releveurup.cmpt_PIC=reader.readAsBinaryString(file1);
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
    this.newRel.cmpt_PIC = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  handleReaderLoadedUp(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.releveurup.cmpt_PIC = btoa(binaryString);
    console.log(btoa(binaryString));
  }

}

