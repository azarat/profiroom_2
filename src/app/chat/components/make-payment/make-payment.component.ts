import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserFinanceService } from 'src/app/core/services/user-finance.service';


@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  @Input() moneyRequired: number;
  @Output() moneyRequiredChange = new EventEmitter();

  public initPayment = null;
  public submited = null;

  public transaction = {
    transactionType: 'input',
    amount: null,
    password: null,
  };
  public errorMessage = null;
  constructor(
    private userFinanceService: UserFinanceService
  ) { }

  ngOnInit() {
  }

  public closePopUp() {
    this.moneyRequiredChange.emit(null);
    this.initPayment = null;
  }

  public openPaymentMenu() {
    this.initPayment = true;
  }

  public makePayment(form: NgForm) {
    this.submited = true;
    if (form.invalid) {
      return;
    }
    this.transaction.amount = this.moneyRequired;
    this.userFinanceService.makePayment(this.transaction);

  }

  public tryPayAgain() {
    this.errorMessage = null;
  }
}
