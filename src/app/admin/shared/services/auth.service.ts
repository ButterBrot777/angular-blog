import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {
  }

  // is setter because logic is more complex than variable: change token, refresh token
  get token(): string {
    return '';
  }

  login(user: User): Observable<any> { // return rxJS stream
    // for now it unknown the url for authorization
    // prototype for coming method for creating user
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void {
  }

  isAuthenticated(): boolean {
    return !!this.token; // fetch to the boolean
  }

  // change token or operate with token
  // private for secure token
  private setToken(response: FbAuthResponse): void {
    // todo: handle response
    console.log('response from stream: ', response);
  }
}
