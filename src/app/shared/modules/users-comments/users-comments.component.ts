import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from '../../interfaces/user-data.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-users-comments',
  templateUrl: './users-comments.component.html',
  styleUrls: ['./users-comments.component.scss']
})
export class UsersCommentsComponent implements OnInit {

  @Input() userData: UserDataInterface;
  public commentFormOpen: number = null;
  public currentTab: {
    id: number,
    name: string,
    value: string;
  } = {
      id: 0,
      name: 'Положительные',
      value: 'positive'
  }
  public id;

  public tabs = [
    {
      id: 0,
      name: 'Положительные',
      value: 'positive'
    },
    {
      id: 1,
      name: 'Отрицательные',
      value: 'negative'
    }
  ];
  public commentForm: {
    id: number,
    text: string,
    sender: number | string
  };

  public showAllchildComments = null;
  public convertedDate = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
  }

  // public openOffer(offerid) {
  //   const translatedPath: any = this.localize.translateRoute('/service');

  //   this.router.navigate( [translatedPath], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       offerId: offerid
  //     },
  //   });
  // }
  public toggleTab(tab: any) {
    this.currentTab = tab;
  }

  public showMoreChileComments(x) {
    this.showAllchildComments !== x ? this.showAllchildComments = x : this.showAllchildComments = null;
  }

  public converDateToDMY(x) {
    return this.convertedDate = x.slice(0, x.indexOf(' '));
  }

  public openComentForm(id: number) {

    this.commentFormOpen = this.commentFormOpen === id? null : id;
    this.commentForm = {
      id: id,
      text: null,
      sender: this.userData.id
    }
  }

  public closeForm() {
    this.commentFormOpen = null;
  }
}
