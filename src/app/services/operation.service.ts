import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Operation } from '../models/operation';

@Injectable()
export class OperationService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private operationsUrl = 'http://localhost:8080/operations';
  constructor(private http:Http) { }

  public getOperations(): Observable<Operation[]> {
    return this.http.get(this.operationsUrl + "/all")
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
 
 
  public getOperation(id: number): Promise<Operation> {
    const url = `${this.operationsUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Operation)
      .catch(this.handleError);
  }
 
 
  public createOperation(operation: Operation): Promise<Operation> {
    return this.http
      .post(this.operationsUrl + "/save", JSON.stringify(operation), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Operation)
      .catch(this.handleError);
  }
 
  public updateOperation(operation: Operation): Promise<Operation> {
    return this.http
      .post(this.operationsUrl + "/update", JSON.stringify(operation), { headers: this.headers })
      .toPromise()
      .then(() => operation)
      .catch(this.handleError);
  }
 
  public deleteOpertaion(operation: Operation) {
    const url = `${this.operationsUrl}/delete/${operation.op_ID}`;
    return this.http.delete(url);
  }
  
  public deleteAll(){
    const url = `${this.operationsUrl}/delete/all`;
    return this.http.delete(url);
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
