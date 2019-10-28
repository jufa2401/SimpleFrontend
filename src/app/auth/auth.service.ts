import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  sessionExpired = false;
  loggedIn = false;
  private baseUri: string = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {
    // Kald der skal ske når man kommer in på siden, her skal den logge dig ud automatisk, hvis din session er udløbet
    const token = localStorage.getItem('token');
    if ( token !== null) {
      this.validate(token).subscribe(() => {}, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status >= 300) {
          this.loggedIn = false;
          this.logoutRemoveToken();
          this.router.navigate(['/login']);
        }
      });
    }
  }
  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        resolve(localStorage.getItem('token') !== null);
        reject(localStorage.getItem('token') === null);
      });
  }

  login(email: string, password: string): Observable <any> {
    const payload: TokenPayload = {email, password};
    return this.http.post(`${this.baseUri}/token`,
      JSON.stringify(payload),
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json') }
    ).pipe(
      map((promise: Promise<JSON>) => {
        localStorage.setItem('token', JSON.stringify(promise));
      })
    );
  }
  validate(stringtoken: string): Observable <any> {
    if (stringtoken.length < 1 || stringtoken === null) { return; }
    let token: JsonWebToken;
    try {
      token = JSON.parse(stringtoken);
    } catch (e) {
      console.log(e);
    }
    return this.http.post(`${this.baseUri}/token/${token.refreshToken}`, null);
  }
  logoutRemoveToken() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}

export interface JsonWebToken {
  accessToken: string;
  refreshToken: string;
  expires: string;
}
export interface TokenPayload {
  email: string;
  password: string;
}


