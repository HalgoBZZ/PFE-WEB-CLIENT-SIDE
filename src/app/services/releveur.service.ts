import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Releveur } from '../models/releveur';
import { LoginService } from './login.service';

@Injectable()
export class ReleveurService {

  constructor(private http: Http, private loginService:LoginService) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private releveursUrl = 'http://localhost:8080/releveurs';
  private jwtToken=null;

  public getReleveurs(): Observable<Releveur[]> {
    this.jwtToken=this.loginService.loadToken();
    const url = `${this.releveursUrl}/byresponsable/${localStorage.getItem('login')}`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  
  }
 
 
  public getReleveur(id: number): Promise<Releveur> {
    const url = `${this.releveursUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Releveur)
      .catch(this.handleError);
  }
 
 
  public createReleveur(releveur: Releveur): Promise<Releveur> {
    return this.http
      .post(this.releveursUrl + "/save", JSON.stringify(releveur), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Releveur)
      .catch(this.handleError);
  }
 
  public updateReleveur(releveur: Releveur): Promise<Releveur> {
    releveur.cmpt_UPDTDT=new Date();
    return this.http
      .post(this.releveursUrl + "/update", JSON.stringify(releveur), { headers: this.headers })
      .toPromise()
      .then(() => releveur)
      .catch(this.handleError);
  }
 
  public deleteReleveur(releveur: Releveur) {
    const url = `${this.releveursUrl}/delete/${releveur.cmpt_ID}`;
    return this.http.delete(url);
      
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
