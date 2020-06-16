import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  UserModel
} from 'src/app/models/user.model';
import {
  mainStatisticConst
} from './consts/main-statistic.const';
import {
  ChartDataSets
} from 'chart.js';
import {
  DasboardService
} from 'src/app/dashboard-page/services/dashboard.service';
import {
  monthArrayConvert
} from 'src/app/shared/functions/month-array-convert.function';
import {
  Subscription
} from 'rxjs';
import {
  UserStateService
} from 'src/app/dashboard-page/services/user-state.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('slickModal', {static: false}) slickModal: SlickCarouselComponent;

  @Input() user: UserModel;
  public statsicArr = mainStatisticConst;
  public currentFinanceFilter = 'M';
  public chartLabels: any[] = [];
  public showPieChart = true;
  // public allStatisticInfo: any[] = compressedFinanceInfoConst;
  private userStateSubscription: Subscription;
  public userRole: string;
  constructor(
    private dashboardService: DasboardService,
    private userStateService: UserStateService
  ) {}

  public slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    'arrows': false,
    'responsive': [
      {
        'breakpoint': 767,
        'settings': {
        'slidesToShow': 1,
        'centerMode': true,
        'centerPadding': '60px',
        'variableWidth': true
        }
      }
    ]
  };

  ngOnInit() {
    this.setMounthLabels();
    this._checkUserState();
  }
  ngAfterViewInit() {this.getScreenSize()}

  public changeWorkStatus(status ?: number) {
    if (status) {
      this.user.busy = this.user.busy === status ? status : this.changeFreelancerWorkStatus(status);
    } else {
      this.user.busy = this.user.busy === 0 ? this.user.busy = 1 : this.user.busy = 0;
      this.changeFreelancerWorkStatus(this.user.busy);
    }
    // this.user.busy = this.user.busy === status? status : this.changeFreelancerWorkStatus(status)
  }

  private changeFreelancerWorkStatus(status) {
    this.dashboardService.changeFreelancerWorkStatus({
      busy: status
    });
    return status;
  }

  public changeDateFilter(filterType: string) {
    this.chartLabels = [];
    this.currentFinanceFilter = filterType;
    this.currentFinanceFilter === 'M' ? this.setMounthLabels() : this.setYearsLabels();
  }

  private setYearsLabels() {
    const currentYear = new Date().getFullYear();
    const minYear = 2019;
    if (currentYear - minYear <= 5) {
      for (let i = minYear; i <= currentYear; i++) {
        this.chartLabels.push(i);
      }
      return this.chartLabels;
    } else {
      for (let i = currentYear - 5; i >= currentYear; i++) {
        this.chartLabels.push(i);
      }
      return this.chartLabels;
    }
  }
  private setMounthLabels() {
    // weekendArrayConvertFunction()
    const currentMonth = new Date().getMonth() + 1;

    const arr = [];
    for (let i = currentMonth; i > currentMonth - 7; i--) { // 7 month before current
      if (i > 0) {
        arr.unshift(i.toString());
      } else if (i === 0) {
        arr.unshift('12');
      } else if (i < 0) {
        arr.unshift((12 - (i * -1)).toString());
      }
    }
    this.chartLabels = monthArrayConvert(arr);
  }

  public openPieChart(x) {
    if (x) {
      this.showPieChart = true;
      return;
    } else {
      this.showPieChart = false;
      return;
    }
  }

  //  If user role changed
  private _checkUserState() {
    this.userStateSubscription = this.userStateService.userState$
      .subscribe(res => {
        this.user.role_id = res;
        this.userRole = res === 1 ? 'Freelancer' : 'Customer';
      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event ? ) {
    if (this.slickModal !== undefined) {
      console.log('defined');

      if (window.innerWidth > 1024) {
        if (this.slickModal.initialized) {
          this.slickModal.unslick();
          console.log('unslick');
        }
      } else if (!this.slickModal.initialized) {
        this.slickModal.initSlick();
        console.log('slick');
      }
    } else {
      console.log('undefined');
    }
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
