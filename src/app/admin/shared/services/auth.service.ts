import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces';
import {Observable} from 'rxjs';

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
    return this.http.post('', user); // prototype for coming method for creating user
  }

  logout(): void {
  }

  isAuthenticated(): boolean {
    return !!this.token; // fetch to the boolean
  }

  // change token or operate with token
  // private for secure token
  private setToken(): void {
  }
}
