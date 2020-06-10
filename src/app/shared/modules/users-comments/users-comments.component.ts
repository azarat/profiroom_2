import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from '../../interfaces/user-data.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserCommentService } from './services/user.comment.service';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-users-comments',
  templateUrl: './users-comments.component.html',
  styleUrls: ['./users-comments.component.scss']
})
export class UsersCommentsComponent implements OnInit {

  @Input() userData: UserDataInterface;
  @Input() userRole: string;
  public commentFormOpen: number = null;
  public currentTab: {
    id: number,
    name: string,
    value: string;
  };
  public commentsCount: number;
  public id;

  public tabs = [
    {
      id: 0,
      name: 'comments.positive-comments',
      value: 'positive'
    },
    {
      id: 1,
      name: 'comments.negative-comments',
      value: 'negative'
    }
  ];

  public userState: number;
  public commentForm: {
    commentText: string,
    commentId: number | string
  };

  public showAllChildComments = null;
  public convertedDate = null;
  public userType: string = null;
  public userAnserType: string = null;
  public authorizatedUserId: number = null;
  public pageType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private userCommentService: UserCommentService,
    private userStateService: UserStateService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.currentTab = this.tabs[0];
    this.findCurrentRoute();
    this.authorizatedUserId = +(this.localStorageService.getItem('userId').value);
  }

  private findCurrentRoute() {
    if(this.router.url.includes('service')) {
      this.pageType = 'service';
    } else if(this.router.url.includes('dashboard')) {
      this.pageType = 'dashboard';
    } else {
      this.pageType = 'user';
    }
  };

  private checkCommentsCount() {
    this.commentsCount = this.userData['negativeComments' + this.userType].length +
    this.userData['positiveComments' + this.userType].length;
  }
  public toggleTab(tab: any) {
    this.currentTab = tab;
  }

  public showMoreChileComments(x) {
    this.showAllChildComments !== x ? this.showAllChildComments = x : this.showAllChildComments = null;
  }

  public converDateToDMY(x) {
    return this.convertedDate = x.slice(0, x.indexOf(' '));
  }

  public openComentForm(id: number) {

    this.commentFormOpen = this.commentFormOpen === id? null : id;
    this.commentForm = {
      commentText: null,
      commentId: id
    };
  }

  public closeForm() {
    this.commentFormOpen = null;
  }

  public sendComment(index, commentType) {
    this.userCommentService.sendComment(this.commentForm )
    .subscribe(res => {
      this.closeForm();
      this.userData[commentType][index].childs.push(res);
    })
  }
}
