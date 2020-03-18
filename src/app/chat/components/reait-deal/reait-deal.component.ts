import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { DealService } from '../../services/deal.service';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';


@Component({
  selector: 'app-rate-deal',
  templateUrl: './rate-deal.component.html',
  styleUrls: ['./rate-deal.component.scss']
})
export class RateDealComponent implements OnInit {

  @Input() offer_id;
  @Input() deal: CollucutorsListInterface;
  public starsArr = new Array(5);
  public isHover: boolean = false;
  public quolityRait: number = 0;
  public termRait: number = 0;
  public civilityRait: number = 0;
  public rateForm: FormGroup;
  userId = this.localStorageService.getItem('userId').value;
  isUserFreelancer: boolean;
  

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private dealService: DealService
  ) { }

  ngOnInit() {
    this.checkIsUserFreelancer();
    this._createForm();
    

  }

  public getQuolity(n, controll){
    this.quolityRait = n;
    this.rateForm.controls[controll].setValue(n);

  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    if (this.deal.freelanser_id === userId) {
      this.isUserFreelancer = true;
    }
  }

  public getTerm(n, controll){
    this.termRait = n;
    this.rateForm.controls[controll].setValue(n);

  }
  public getCivility(n: any, controll){
    this.civilityRait = n;
    this.rateForm.controls[controll].setValue(n);

  }

  private _createForm() {
    this.rateForm = this.fb.group({
      quality: [null],
      userId: [null],
      term: [null],
      civility: [null],
      comment: [null, Validators.required],
      offerId: [null],
      requirementsClarity: [null],
      taskClarity: [null],
      contactLevel: [null],
      dealId: [null]

    });
  }

  public submitRaite() {
    this.rateForm.controls['offerId'].setValue(this.offer_id);
    this.rateForm.controls['userId'].setValue(this.getCollocutorId());
    this.rateForm.controls['dealId'].setValue(this.deal.id);
    let type = this.isUserFreelancer? 'Customer' : "Deal";
    this.dealService.setDealRate(this.rateForm.value, type)
    .subscribe(res => {
      if(res === 'ok') {

      }
    })
  }

  private getCollocutorId() {
    return this.userId === this.deal.freelanser_id ? this.deal.customer_id : this.deal.freelanser_id;
  }
}
