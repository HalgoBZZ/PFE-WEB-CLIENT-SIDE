import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { LoginService } from './login.service';
import { Secteur } from '../models/secteur';

@Injectable()
export class SecteurService {


  private headers = new Headers({ 'Content-Type': 'application/json' });
  private secteursUrl = 'http://localhost:8080/secteurs';

  constructor(private http:Http, private loginService:LoginService) { }

  public getSecteurs(): Observable<Secteur[]> {
    const url = `${this.secteursUrl}/all`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  public getSecteur(id: number): Observable<Secteur> {
    const url = `${this.secteursUrl}/get/${id}`;
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) => Observable.throw(error.json().error ||'Server error'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
