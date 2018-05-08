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
  
  constructor(private http: HttpClient, private http2:Http) { }

  login(user){
    return this.http.post(this.host+"/login",user, { observe :'response' });
  }

  saveToken(jwt:string){
    this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
    let jwtHelper=new JwtHelperService();
    this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
  }

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
  }

  getToken(){
    return this.jwtToken;
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
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
