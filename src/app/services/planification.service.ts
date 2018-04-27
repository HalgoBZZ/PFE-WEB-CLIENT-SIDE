import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Planification } from '../models/planification';

@Injectable()
export class PlanificationService {

  constructor(private http:Http) { }
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private planificationsUrl = 'http://localhost:8080/planifications';


  public getPlanifications(): Observable<Planification[]> {
    return this.http.get(this.planificationsUrl + "/all")
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
 
  public getPlanification(id: number): Promise<Planification> {
    const url = `${this.planificationsUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Planification)
      .catch(this.handleError);
  }
 
 
  public createPlanification(planification: Planification): Promise<Planification> {
    return this.http
      .post(this.planificationsUrl + "/save", JSON.stringify(planification), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Planification)
      .catch(this.handleError);
  }
 
  public updatePlanification(planification: Planification): Promise<Planification> {
    return this.http
      .post(this.planificationsUrl + "/update", JSON.stringify(planification), { headers: this.headers })
      .toPromise()
      .then(() => planification)
      .catch(this.handleError);
  }
 
  public deletePlanification(planification: Planification) {
    const url = `${this.planificationsUrl}/delete/${planification.planif_ID}`;
    return this.http.delete(url);
      
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
