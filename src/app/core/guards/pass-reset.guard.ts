import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { AuthentificationService } from '../services/auth.service';

@Injectable()

export class PassResetGuard {
    constructor(
        private router: Router,
        private localize: LocalizeRouterService,
        private authService: AuthentificationService,
        // tslint:disable-next-line: variable-name
        private _route: ActivatedRoute,
      ) { 
        this._route.queryParams.subscribe(p => {
            console.log(p)
          });
      }
    
      canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
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