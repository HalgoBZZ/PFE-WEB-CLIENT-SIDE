import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Code } from '../models/code';

@Component({
  selector: 'app-codeverification',
  templateUrl: './codeverification.component.html',
  styleUrls: ['./codeverification.component.css']
})
export class CodeverificationComponent implements OnInit {

  private code:Code;
  private mod:number;
  private valeurbd:string;
  constructor(private route:Router,private loginService:LoginService) { }

  ngOnInit() {
    this.valeurbd=null;
    this.mod=0;
    this.getCode();
    this.code=new Code();
  }

  public getCode(){
    this.loginService.getCode()
    .subscribe(
      data => {
        this.valeurbd = data;
      },
      err => {
        console.log(err.json().err);
      }
 
    );
  }

  public sendCode(){
    if(this.code.valeur==this.valeurbd){
      this.route.navigateByUrl('/changepwd');
    }else{
      this.mod=1;
    }
  }

}
