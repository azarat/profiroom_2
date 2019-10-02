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

@Injectable()

export class AuthorisatedGuard implements  CanActivateChild {

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private authService: AuthentificationService
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    if (!this.authService.currentUserToken) {
      return true;
    }
    const redirectToAuthPath: any = this.localize.translateRoute('/dashboard');
    this.router.navigate([redirectToAuthPath]);
    return false;
  }
}
