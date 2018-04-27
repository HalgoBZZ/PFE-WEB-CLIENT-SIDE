import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Tournee } from '../models/tournee';


@Injectable()
export class TourneeService {

  constructor(private http:Http) { }
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private tourneesUrl = 'http://localhost:8080/tournees';


  public getTournees(): Observable<Tournee[]> {
    return this.http.get(this.tourneesUrl + "/all")
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
 
  public getTournee(id: number): Promise<Tournee> {
    const url = `${this.tourneesUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Tournee)
      .catch(this.handleError);
  }
 
 
  public createTournee(tournee: Tournee): Promise<Tournee> {
    return this.http
      .post(this.tourneesUrl + "/save", JSON.stringify(tournee), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Tournee)
      .catch(this.handleError);
  }
 
  public updateTournee(tournee:Tournee): Promise<Tournee> {
    return this.http
      .post(this.tourneesUrl + "/update", JSON.stringify(tournee), { headers: this.headers })
      .toPromise()
      .then(() => tournee)
      .catch(this.handleError);
  }
 
  public deletePlanification(tournee: Tournee) {
    const url = `${this.tourneesUrl}/delete/${tournee.tour_ID}`;
    return this.http.delete(url);
      
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
