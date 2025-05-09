import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        

        if (error.status === 400) {
          // Redirect to the NotFound component if 404 error occurs
          // this.router.navigateByUrl('/400');
          
        }
        
        else {
          // Redirect to the BadRequest component if 400 error occurs
          
        }
        return throwError(error)
      })
    );
  }
}
