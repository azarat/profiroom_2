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
  AuthentificationService
} from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthentificationService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest < any > ,
    next: HttpHandler
  ): Observable < HttpEvent < any >> {
    // http://194.28.103.239/
    // const url = 'http://dev.thecubetest.site/Backend/api';
    const url = 'https://www.thecubetest.site/Backend/api';
    const token = this.localStorageService.getItem('token').value;
    if (req.url.indexOf('http' || 'https') !== 0) {
      req = req.clone({
        url: url + req.url
      });

      if (token) {
        req = req.clone({
          headers: req.headers.set('Authorization',
            'Bearer ' + token)
        });
      }
    }

    return next.handle(req).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText;
        if (err.status === 401) {
          this.authService.logOut();
        }
        return throwError(error);
      })
    );
  }

}
