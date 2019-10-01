import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()



export class UserService {

    constructor(
        private http: HttpClient,
    ) {

    }
    getDashboardRes = () => {
        return this.http.get('/user');
    }
}
