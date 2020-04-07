import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserCommentService {

    constructor(private http: HttpClient){}

    public sendComment() {
        
    }
}