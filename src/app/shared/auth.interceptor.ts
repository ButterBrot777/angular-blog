import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private auth: AuthService,
		private router: Router
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// check if user is authenticated
		if (this.auth.isAuthenticated()) {
			req = req.clone({
				setParams: {
					auth: this.auth.token // set param 'auth', add token
				}
			});
		}
		return next.handle(req)
			.pipe(
				tap(() => {
					console.log('intercept')
				}),
				catchError(
					(error: HttpErrorResponse) => {
						console.log('Interceptor Error: ', error);
						if (error.status === 401) { // if error is 401 - unauthorised
							this.auth.logout();
							this.router.navigate(['/admin', 'login'], {
								queryParams: {
									authFailed: true, // set 'authFailed=true' param in url
								}
							});
						}
						return throwError(error);
					}
				));
	}

}