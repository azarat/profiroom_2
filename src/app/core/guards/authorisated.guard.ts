import {
  Injectable
} from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import {
  LocalizeRouterService
} from 'localize-router';
import {
  AuthentificationService
} from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()

export class AuthorisatedGuard implements  CanActivateChild {
  token = null;
  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private authService: AuthentificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.token = this.localStorageService.getItem('token');
   }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    if (!this.token.value) {
      return true;
    }
    const redirectToAuthPath: any = this.localize.translateRoute('/dashboard/home');
    this.router.navigate([redirectToAuthPath]);
    return false;
  }
}
