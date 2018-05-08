import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private loggedIn=false;
  constructor(public loginService:LoginService, private router:Router) { }

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
