import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { FinanceInterface } from '../../interfaces/finance.interface';
import { FormControl, NgForm } from '@angular/forms';
import { compressedFinanceInfoConst } from '../../consts/compressed-finance-info.const';
import { UserFinanceService } from '../../../../../core/services/user-finance.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-user-finances',
  templateUrl: './user-finances.component.html',
  styleUrls: ['./user-finances.component.scss']
})
export class UserFinancesComponent implements OnInit, AfterViewInit {

  @ViewChild('slickModall', {static: false}) slickModal: SlickCarouselComponent;

  public userFinance: FinanceInterface;
  public transactions = {
    transactionType: 'deffault',
    amount: null,
    creditCard: null,
    password: null,
  };
  public paymentsFullSize =  false;
  public userCashMoves: any[];
  public allStatisticInfo: any[] = compressedFinanceInfoConst;
  public submited: boolean = null;
  public errorMessage: boolean = null;
  public iframeUrl: string = null;
  constructor(
    private userFinanceService: UserFinanceService
  ) { }

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
          'centerPadding': '40px',
          'variableWidth': true
        }
      }
    ]
  };

  ngOnInit() {
    this.getFinanceData();
  }
  ngAfterViewInit() {
    this.getScreenSize();
  }

  private getFinanceData() {
    this.userFinanceService.getUserFinanceData()
      .subscribe((res: any) => {
        this.userFinance = res;
      });
  }



  public makePayment(form: NgForm) {
    this.submited = true;
    if (form.invalid) {
      return;
    }
    this.userFinanceService.makePayment(this.transactions)
  }

 public unrollPaymentsList() {
   this.paymentsFullSize = !this.paymentsFullSize;
  }

  public rollPaymentsList() {
    this.paymentsFullSize = false;
  }

  public tryPayAgain() {
    this.errorMessage = null;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {

    setTimeout(() => {
        if (window.innerWidth > 1024) {
          console.log('biger');
          if (this.slickModal.initialized) { this.slickModal.unslick(); console.log('unslick');}
        } else if (!this.slickModal.initialized) {
          this.slickModal.initSlick();
        }
    }, 1000);

  }
  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
