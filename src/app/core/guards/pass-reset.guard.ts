import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, CanActivateChild, CanActivate } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { AuthentificationService } from '../services/auth.service';

@Injectable()

export class PassResetGuard implements CanActivate {
  token: string | boolean = null;
  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private authService: AuthentificationService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
  ) {
    this._route.queryParams.subscribe(data => {
      console.log(data);
      if (data.token !== undefined) {
        this.token = data.token;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.token !== null) {
      return true;
    }
    const redirectToAuthPath: any = this.localize.translateRoute('/dashboard');
    this.router.navigate([redirectToAuthPath]);
    return false;


  }

  // checkLoginStatus = () => {
  //   if (!this.authService.currentUserToken) {
  //     return true;
  //   }
  //   const redirectToAuthPath: any = this.localize.translateRoute('/dashboard');
  //   this.router.navigate([redirectToAuthPath]);
  //   return false;
  // }
}
