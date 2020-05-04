import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ErrorChatMessageService {

    private errorMessage = new BehaviorSubject<any>(null);
    public errorMessage$ = this.errorMessage.asObservable();


    public setErrorMessage(data: any) {
        this.errorMessage.next(data);
    }

}