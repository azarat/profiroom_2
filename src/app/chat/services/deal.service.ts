import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DealService {

    constructor(
        private http: HttpClient
    ){}

    public setDealRate(rateData: any, type: string) {
        // Type => Deal -> freelancer // Customer for customer
        return this.http.post('/send' + type + 'Comment', rateData);
    }

    public callToArbiter(id: number) {
        return this.http.post('/callArbiter', { deal_id: id });
    }

      // tslint:disable-next-line:variable-name
    public getBrief(_offerId) {
        return this.http.post('/getOfferBrief', { offer_id: _offerId });
    }

    // tslint:disable-next-line: variable-name
    public sendBeef(_deal_id: number, _answer: any) {
        return this.http.post('/setDealBriefAnswers', { deal_id: _deal_id, answers: JSON.stringify(_answer) });
    }

    // tslint:disable-next-line:variable-name
    public deleteDeal(_deal_id: number, ) {
        return this.http.post('/deleteDeal', { deal_id: _deal_id });
    }


    public getDealData(dealId: number) {
        return this.http.post('/getDealVsCollocutorData', {deal_id: dealId  });
    }

    public approveBrief(dealId: number) {
        return this.http.post('/approveBrief', {deal_id: dealId });
    }

    public refuseBrief(dealId: number) {
        return this.http.post('/refuseBrief', {deal_id: dealId });
    }

    // hold money on deal

    public holdMoney(dealId: number) {
        return this.http.post('/holdMoney', {deal_id: dealId });
    }

    public startWork(dealId: number) {
        return this.http.post('/startWork', {deal_id: dealId });
    }

    public cancelWork(dealId: number) {
        return this.http.post('/cancellationDeal', {deal_id: dealId });
    }
    public submitDealCancel(dealId: number) {
        return this.http.post('/submitDealCancel', {deal_id: dealId });
    }

    public finishDeal(dealId: number) {
        return this.http.post('/finishDeal', {deal_id: dealId });
    }
    public submitFinishDeal(dealId: number) {
        return this.http.post('/submitDealFinish', {deal_id: dealId });
    }
    public cancelFinishDeal(dealId: number) {
        return this.http.post('/cancelFinishDeal', {deal_id: dealId });
    }

}
