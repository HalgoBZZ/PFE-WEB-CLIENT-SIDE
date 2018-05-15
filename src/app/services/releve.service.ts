import { Injectable } from '@angular/core';
import { Http,Response, Headers  } from '@angular/http';
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Releve } from '../models/releve';

@Injectable()
export class ReleveService {

  private relevesUrl = 'http://localhost:8080/releves';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http:Http) { }


  getByPdl(id:number): Observable<Releve[]>{
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    const url = `${this.relevesUrl}/bypdl/${id}`;
    return this.http.get(url,{headers: this.headers})
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  public getReleve(id: number): Observable<Releve> {
    const url = `${this.relevesUrl}/get/${id}`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

}
