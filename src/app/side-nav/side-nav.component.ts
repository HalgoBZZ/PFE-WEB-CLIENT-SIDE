import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Responsable } from '../models/responsable';
import { LoginComponent } from '../login/login.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  private responsable:Responsable;
  private logincomp:LoginComponent;
  constructor(private loginService:LoginService, public _DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.responsable=new Responsable();
    this.getResponsable()
  }

  transform(value){
    return this._DomSanitizer.bypassSecurityTrustHtml(value);
    }
  public getResponsable(){
    this.loginService.getUserByLogin(localStorage.getItem('login'))
    .subscribe(
      data => {
        this.responsable = data;
        this.responsable.cmpt_PIC=this.transform(this.responsable.cmpt_PIC);
      },
      err => {
        console.log(err);
      }
 
    );
  }


}
