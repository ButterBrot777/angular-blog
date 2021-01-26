import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from '../../../shared/interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  // stream-variable error
  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  // is setter because logic is more complex than variable: change token, refresh token
  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> { // return rxJS stream
                                       // for now it unknown the url for authorization
                                       // prototype for coming method for creating user
    user.returnSecureToken = true; // firebase request body payload requirement (template)
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.apiKey }`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token; // fetch to the boolean
  }

  // handle errors
  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email does not exist');
        break;
    }
    return throwError(error);
  }

  // change token or operate with token

  // private for secure token
  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      // calculate date when token will be expired
      // time now plus token duration * 1000 to get value in milliseconds
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

      // save tokens in local storage
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
