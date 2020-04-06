import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ChartDataService {

    constructor(
        private http: HttpClient
    ) {}

    public getAllFinances(date) {
        return this.http.post('/usersFinanceGraph', date);
    }
}
