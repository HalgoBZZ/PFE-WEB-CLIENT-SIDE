import { Component, OnInit } from '@angular/core';
import { Responsable } from '../models/responsable';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passforget',
  templateUrl: './passforget.component.html',
  styleUrls: ['./passforget.component.css']
})
export class PassforgetComponent implements OnInit {

  private pass:Responsable;
  private responsable:Responsable;
  private mode:number;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
    this.pass=new Responsable();
    this.responsable=new Responsable();
  }

  sendEmail(){
    this.getResponsable();
    if(this.mode!=1){
      this.router.navigateByUrl('/code');
    }

  }

  public getResponsable(){
    localStorage.setItem('loginf',this.pass.cmpt_LOGIN);
    localStorage.setItem('mail',this.pass.cmpt_EMAIL);
    this.loginService.getUserByEmail(this.pass.cmpt_LOGIN,this.pass.cmpt_EMAIL)
    .subscribe(
      data => {
        this.responsable = data;
      },
      err => {
        this.mode=1;
      }
 
    );
  }

}
