import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Responsable } from '../models/responsable';


@Injectable()
export class LoginService {

  private host:string="http://localhost:8080";
  private jwtToken=null;
  private roles:Array<any>;
  private url='http://localhost:8080/responsables';
  private cmptUrl='http://localhost:8080/comptes';
  
  constructor(private http: HttpClient, private http2:Http) { }

  login(user){
    return this.http.post(this.host+"/login",user, { observe :'response' });
  }

  saveToken(jwt:string){
    this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
    let jwtHelper=new JwtHelperService();
    this.roles=jwtHelper.decodeToken(jwt).roles
  }

  getRoles(jwt:string, roles:Array<any>){
    
  }

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
  }

  getToken(){
    return this.jwtToken;
  }

  isRes(login:string):Observable<boolean>{
    const url1 = `${this.cmptUrl}/isresponsable/${login}`;
    return this.http2.get(url1)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  isResponsable(){
    for(let r of this.roles){
      if(r.authority=="RESPONSABLE")
      {
        return true;
      }
      return false;
    }
  }

  getUserByLogin(login:string): Observable<Responsable> {
    const url1 = `${this.url}/getbylogin/${login}`;
    return this.http2.get(url1)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
  
  getCode(): Observable<string> {
    const url1 = `${this.url}/getcode`;
    return this.http2.get(url1)
    .map((res:Response)=> res.text())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
  getUserByEmail(login:string, email:string):Observable<Responsable>{
    const url1=`${this.url}/getbyemail/${login}/${email}`;
    return this.http2.get(url1)
      .map((res:Response)=> res.json())
      .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
  logout(){
    this.jwtToken=null;
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedin');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
