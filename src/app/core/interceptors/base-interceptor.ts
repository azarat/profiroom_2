import {
  Injectable
} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError
} from 'rxjs/operators';
import {
  User
} from 'src/app/models/user.model';
import {
  AuthService
} from '../services/auth.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest < any > ,
    next: HttpHandler
  ): Observable < HttpEvent < any >> {
    const url = 'https://www.thecubetest.site/Backend/api';
    const token: string = this.authService.currentUserValue;
    if (req.url.indexOf('http' || 'https') !== 0) {
      req = req.clone({
        url: url + req.url
      });
    }
    if (token) {
      console.log(token);
      req = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });
    }
    return next.handle(req).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

}
