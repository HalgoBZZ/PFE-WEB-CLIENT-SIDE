import { Component, OnInit } from '@angular/core';
import { Responsable } from '../models/responsable';
import { ResponsableService } from '../services/responsable.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url = '';
  file: File=null;
  private releveurup:Responsable;
  constructor(private responsableService:ResponsableService, private loginService:LoginService) { }

  ngOnInit() {
    this.releveurup=new Responsable();
   this.getResponsable();
   console.log(this.releveurup.cmpt_FIRST_NAME);
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

  public getResponsable(){
    this.loginService.getUserByLogin(localStorage.getItem('login'))
    .subscribe(
      data => {
        this.releveurup = data;
      },
      err => {
        console.log(err);
      }
 
    );
  }
  updateProfile(releveurup:Responsable):void{
    this.responsableService.updateResponsable(releveurup);
    localStorage.setItem('login',releveurup.cmpt_LOGIN);
    location.reload();
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
  handleReaderLoadedUp(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.releveurup.cmpt_PIC = btoa(binaryString);
    console.log(btoa(binaryString));
  }

}
