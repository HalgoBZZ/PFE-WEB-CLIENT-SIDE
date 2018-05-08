import { Component, OnInit } from '@angular/core';
import { Responsable } from '../models/responsable';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ResponsableService } from '../services/responsable.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  private responsable:Responsable;
  private mode:number;
  private resp:Responsable;
  constructor(private route:Router, private loginService:LoginService,
    private responsableService:ResponsableService) { }

  ngOnInit() {
    this.responsable=new Responsable();
    this.resp=new Responsable();
    this.getResponsable();
  }

  public getResponsable(){
    this.loginService.getUserByEmail(localStorage.getItem('loginf'),localStorage.getItem('mail'))
    .subscribe(
      data => {
        this.resp = data;
      },
      err => {
        this.mode=1;
      } 
    );
  }

  public updatePwd(responsable):void{
    this.responsableService.updateResponsable(responsable);
  }

  public sendPwd(){
    this.resp.cmpt_PWD=this.responsable.cmpt_PWD;
    this.updatePwd(this.resp);
    localStorage.removeItem('loginf');
    localStorage.removeItem('mail');
    this.route.navigateByUrl('/login');
  }
}
