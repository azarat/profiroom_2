import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ArbitrationService {

    constructor(
        private http: HttpClient
    ) {}


    public getArbitrationsList() {
        return this.http.post('/getArbitrations', {})
    }

    public lookOnDeal(roomId: string) {
        return this.http.post('/getArbitrDeal', { roomid: roomId });
    }

    public makeArbitration(data) {
        return this.http.post('/makeJustice', data);
    }
}