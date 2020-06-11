import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { UserService } from 'src/app/core/services/user.service';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-page-about-offer',
  templateUrl: './service-page-about-offer.component.html',
  styleUrls: ['./service-page-about-offer.component.scss']
})
export class ServicePageAboutOfferComponent implements OnInit {
  @Input() offerData: OfferDataInterface;
  @Input() loginedUserId: any;
  
  public convertedNumberOfComments;

  public lvlTranslation = [
    'ranks.zero.title',
    'ranks.first.title',
    'ranks.second.title',
    'ranks.third.title',
    'ranks.forth.title'
  ];

  constructor(
    private servicePageService: ServicePageService,
    private currentUserService: UserService,
    private localize: LocalizeRouterService,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.formateCommentCount();
    console.log(this.offerData)
  }

  formateCommentCount() {
    if (this.offerData.comments_count < 1000) {
      this.convertedNumberOfComments = this.offerData.comments_count;
    } else {
      this.convertedNumberOfComments = this.offerData.comments_count.toFixed(1) + "k+";
    }
  }
    // Open ChatRoom ws this collocutor
    public openChat(userId) {
      this.currentUserService.wrightTo(userId)
        .subscribe(res => {
          if (res === 'ok') {
            const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
            this.router.navigate([translatedPath]);
          }
        });
      const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
      this.router.navigate([translatedPath]);
    }
}
