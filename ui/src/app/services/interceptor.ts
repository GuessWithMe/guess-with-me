import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      withCredentials: true,
      headers: req.headers.set('Content-Type', 'application/json'),
    });

    return next.handle(clonedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
        }

        return throwError(err);
      }),
    );
  }
}
