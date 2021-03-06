import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
        providedIn: 'root'
    }
)

export class SiteLocaleService {

    private currentLang = new BehaviorSubject(null);
    public currentLang$: Observable<string>;

    constructor(
    ) {
        this. currentLang$ = this.currentLang.asObservable();
    }

    public changeLangTo(lang: string) {
        this.currentLang.next(lang);
        console.log(lang);
    }


}
