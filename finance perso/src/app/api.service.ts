import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

const apiUrl = 'http://localhost:3300/';
const apiUrl2 = 'http://localhost:3300/getmonthdetails';
const apiUrl3 = 'http://localhost:3300/delete';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A error', error.error.message);
    } else {

      console.error(

        ` code retourné : ${error.status} Pas de connexion à l'API,` +
        `body was : ${error.error}`);
    }
    return throwError('Essayez à nouveau ');
  }

  private extractData(res: any) {
    let body = res.recordset;
    return body || {};
  }

  getDataUser() {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getDataUserChart() {
    return this.http.get(apiUrl2, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


}



















/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

const apiUrl = 'http://localhost:3300/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A error', error.error.message);
    } else {

      console.error(

        `Backend returned code ${error.status},` +
        `body was : ${error.error}`);
    }
    return throwError('try again');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getDataUser() {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}




 */