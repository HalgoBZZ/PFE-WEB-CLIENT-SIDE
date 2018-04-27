import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Responsable } from '../models/responsable';

@Injectable()
export class ResponsableService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private responsablesUrl = 'http://localhost:8080/responsables';

  public getResponsables(): Observable<Responsable[]> {
    return this.http.get(this.responsablesUrl + "/all")
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
 
  public getResponsable(id: number): Promise<Responsable> {
    const url = `${this.responsablesUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Responsable)
      .catch(this.handleError);
  }
 
 
  public createResponsable(responsable: Responsable): Promise<Responsable> {
    return this.http
      .post(this.responsablesUrl + "/save", JSON.stringify(responsable), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Responsable)
      .catch(this.handleError);
  }
 
  public updateResponsable(responsable: Responsable): Promise<Responsable> {
    return this.http
      .post(this.responsablesUrl + "/update", JSON.stringify(responsable), { headers: this.headers })
      .toPromise()
      .then(() => responsable)
      .catch(this.handleError);
  }
 
  public deleteResponsable(responsable: Responsable) {
    const url = `${this.responsablesUrl}/delete/${responsable.cmpt_ID}`;
    return this.http.delete(url);
      
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
