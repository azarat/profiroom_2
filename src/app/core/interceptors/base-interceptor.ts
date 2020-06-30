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
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthentificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private localize: LocalizeRouterService,
    private route: ActivatedRoute,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let url;
    if (location.origin === 'http://localhost:4200') {
      // url = 'http://test.thecubetest.site/Backend/api';
      url = 'http://dev.thecubetest.site/Backend/api';
      // url = 'http://167.71.70.221/Backend/api'

      // url = 'http://dev.thecubetest.site/Backend/api';
    } else {
      url = location.origin + '/Backend/api';
    }




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
          location.reload();
        }
        if (err.status === 403) {
          let url = this.localize.translateRoute('');
          this.router.navigate([url], {
            relativeTo: this.route,
          });
        }
        return throwError(error);
      })
    );
  }

}
