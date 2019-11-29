import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';

interface ICache {
  [key: string]: BehaviorSubject < any > ;
}


// tslint:disable-next-line: ban-types
type serializable = object | Object;


@Injectable()

export class LocalStorageService {
  private cache: ICache;

  constructor() {
    this.cache = Object.create(null);
  }

  setItem(key: string, value: any): BehaviorSubject<any> {

    const itemsArray = [];
    const items =  JSON.parse(localStorage.getItem('visitedCar'));
    if ( items === null) {
      itemsArray.push(value);
      localStorage.setItem(key, JSON.stringify(itemsArray) );
    } else {
      if (items.includes(value)) {
          return;
      } else {
        items.push(value);
      }
      localStorage.setItem(key, JSON.stringify(items));
    }
    return this.cache[key] = new BehaviorSubject(value);
  }

  getItem(key: string): BehaviorSubject<any> {
    if (this.cache[key]) {
      return this.cache[key];
    } else {
      return this.cache[key] = new BehaviorSubject( JSON.parse(localStorage.getItem(key) ) );
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    if (this.cache[key] ) {
      this.cache[key].next( undefined);
    }
  }
}
