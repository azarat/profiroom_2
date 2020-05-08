import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from '../../interfaces/user-data.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserCommentService } from './services/user.comment.service';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';

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

  public userState: number;
  public commentForm: {
    commentText: string,
    commentId: number | string
  };

  public showAllChildComments = null;
  public convertedDate = null;
  public userType: string = null;
  public userAnserType: string = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private userCommentService: UserCommentService,
    private userStateService: UserStateService
  ) { }

  ngOnInit() {
    // if(this.userData.negative_comments_count == 0) {
    //   this.currentTab.id = 0;
    //   this.currentTab.name = 'Положительные';
    //   this.currentTab.value = 'negative';
    // }
    console.log(this.userData);
    // console.log(this.userData[this.currentTab.value + 'Comments']);
    this.checkUserState();
  }

  private checkUserState() {
    this.userStateService.userState$
    .subscribe(res=> {
      // this.userState = res;
      this.userType = res === 1 ? 'Freelancer' : 'Customer';
      // this.userAnserType = res === 1 ? 'custromer' : 'freelancer';
    })
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
    }
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
