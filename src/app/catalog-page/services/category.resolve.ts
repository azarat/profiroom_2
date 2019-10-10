import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()

export class CategoryResolver implements Resolve<any> {

  constructor( ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params.category);
  }
}
