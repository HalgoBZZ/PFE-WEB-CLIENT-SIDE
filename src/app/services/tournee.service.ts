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
  private pdlUrl='http://localhost:8080/pdls';
  private mesuresUrl="http://localhost:8080/mesurecadrans"


  public getTournees(): Observable<Tournee[]> {
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    return this.http.get(this.tourneesUrl + "/all", { headers: this.headers })
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
  public getNonAffecter(): Observable<Tournee[]> {
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    return this.http.get(this.tourneesUrl + "/nonaffecter",{ headers: this.headers })
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  public getAvalider(): Observable<Tournee[]> {
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    return this.http.get(this.mesuresUrl + "/tourneeavalider",{ headers: this.headers })
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
  public getTournee(id: number): Observable<Tournee> {
    const url = `${this.tourneesUrl}/get/${id}`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
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
 
  public deleteTournee(tournee: Tournee) {
    const url = `${this.tourneesUrl}/delete/${tournee.tour_ID}`;
    return this.http.delete(url);
      
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
