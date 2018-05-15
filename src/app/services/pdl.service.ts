import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Http,Response, Headers  } from '@angular/http';
import { Pdl } from '../models/pdl';
import 'rxjs/add/observable/throw'
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PdlService {

  private pdlsUrl = 'http://localhost:8080/pdls';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private loginService:LoginService, private http:Http) { }


  getByTournee(id:number): Observable<Pdl[]>{
    let jwtToken=localStorage.getItem('token');
    this.headers.append("Authorization", `JWT ${jwtToken}`);
    const url = `${this.pdlsUrl}/bytournee/${id}`;
    return this.http.get(url,{headers: this.headers})
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  public getPdl(id: number): Observable<Pdl> {
    const url = `${this.pdlsUrl}/get/${id}`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }
}
