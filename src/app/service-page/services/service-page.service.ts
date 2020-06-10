import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';


@Injectable()
export class ServicePageService {

  public messageNotAuthorized = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  loadOfferDate(offerid: object) {
    return this.http.post('/showOffer', offerid);
  }

  getViewedOffers(offersIdArr: string[]) {
    return this.http.post('/visitedOffer', { VisitedOffer: offersIdArr });
  }

  similarOffers(offerid: object) {
    return this.http.post('/similarOffers', offerid);
  }

  public makeDeal(data: object, offer_id) {
    return this.http.post('/makeDeal', data)
    .subscribe((res: any) => {
      this.routeToWorkChat(res.dealId, offer_id, res.roomId);
    });
  }

  // Navigate to work chat vs querry params to open this deal as active
  public routeToWorkChat(dealRoomId: number, _offerId: number, _roomId: string) {
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: { id: dealRoomId, offers_id: _offerId, brief: 0, roomId: _roomId },
    });
  }


  getSpinnerState(): Observable<boolean> {
    return this.messageNotAuthorized;
  }; 

  setSpinnerState(state): void {
    this.messageNotAuthorized.next(state);
  };



}
