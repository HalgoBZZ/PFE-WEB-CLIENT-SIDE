import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';
import { Responsable } from '../models/responsable';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private user: User;
  private loggedIn=false; 
  private isResponsable=false;
  private token=null;
  private responsable:Responsable;
  private mode:number;
  private isRes:boolean;
  private roles:Array<any>;
  constructor(private router:Router, private loginService:LoginService) { }

  
  onLogin(){
    this.loginService.login(this.user).subscribe(resp => {
      let jwt=resp.headers.get('Authorization');
      this.loginService.saveToken(jwt);
     // this.getRoles(sessionStorage.getItem('token'));
      localStorage.setItem('login',this.user.cmpt_LOGIN);
      this.getIsRes(localStorage.getItem('login'));
      //let isRes=this.loginService.isRes(this.user.cmpt_LOGIN);
     /* for(let r of this.roles){
        if(r.authority=="RESPONSABLE")
        {
          isRes= true;
          break;
        }
      }*/
      if(this.isRes||this.loginService.isResponsable()){
        localStorage.setItem('role','resp');
      }else{
        localStorage.setItem('role','other');
        this.mode=1;
      }
      this.router.navigateByUrl('/home');
    },
    err =>{
      this.mode=1;
    })
  }

  public getIsRes(login:string){
    this.loginService.isRes(login)
    .subscribe(
      data => {
        this.isRes = data;
      },
      err => {
        console.log(err.json().err);
      }
 
    );
  }

  getRoles(jwt:string){
    this.loginService.getRoles(jwt,this.roles);
  }

  ngOnInit() {
    this.responsable=new Responsable();
    this.user=new User();
    if(localStorage.getItem('token')!=null){
      if(localStorage.getItem('role')=="resp")
      {
        this.router.navigateByUrl('/home');
      }
    }
  }

  
 
}
