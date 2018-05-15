import { Injectable } from '@angular/core';
import { Http,Response, Headers  } from '@angular/http';
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Mesure } from '../models/mesure';

@Injectable()
export class MesureService {

  private mesuresUrl = 'http://localhost:8080/mesurecadrans';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http:Http) { }


  getByReleve(id:number): Observable<Mesure[]>{
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    const url = `${this.mesuresUrl}/byreleve/${id}`;
    return this.http.get(url,{headers: this.headers})
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

}
