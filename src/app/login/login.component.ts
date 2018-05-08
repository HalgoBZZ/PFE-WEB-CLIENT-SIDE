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
  constructor(private router:Router, private loginService:LoginService) { }

  
  onLogin(){
    this.loginService.login(this.user).subscribe(resp => {
      let jwt=resp.headers.get('Authorization');
      this.loginService.saveToken(jwt);
      localStorage.setItem('login',this.user.cmpt_LOGIN);
      if(this.loginService.isResponsable()){
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
  
  ngOnInit() {
    this.responsable=new Responsable();
    this.user=new User();
    if (localStorage.getItem('token')!=null)
    if(localStorage.getItem('role')=="resp")
    {
      this.router.navigateByUrl('/home');
    }
  }

  
 
}
