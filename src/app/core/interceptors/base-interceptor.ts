import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(

  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = 'https://www.thecubetest.site/Backend/api';
    if (req.url.indexOf('http' || 'https' ) !== 0 ) {
      req = req.clone({
        url: url + req.url
      });
    }
    // if (      ) {
    //   console.log('xx');
    // }

    return next.handle(req).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

}
