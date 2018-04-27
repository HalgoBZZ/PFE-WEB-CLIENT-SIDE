import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private credential={'username':'', 'password':''};
  private loggedIn=false;

  constructor(private router:Router, private loginService:LoginService) { }

  logged(){
    this.router.navigate['/home'];
  }
  ngOnInit() {
  }
}
