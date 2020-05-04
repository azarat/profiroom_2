import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorService } from '../../services/collocutor.service';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { DealService } from '../../services/deal.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-rate-deal',
  templateUrl: './rate-deal.component.html',
  styleUrls: ['./rate-deal.component.scss']
})
export class RateDealComponent implements OnInit {

  @Input() offer_id;
  public collocutorData: CollocutorInterface;
  public starsArr = new Array(5);
  public isHover_first: boolean = false;
  public isHover_second: boolean = false;
  public isHover_third: boolean = false;
  public qualityRating: number = 0;
  public termRating: number = 0;
  public civilityRating: number = 0;
  public rateForm: FormGroup;
  public userId = this.localStorageService.getItem('userId').value;
  public isUserFreelancer: boolean;
  public hoveredEl: number = null;
  public userType: string = null;
  public rated: boolean = null;
  public submit: boolean = null;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private collocutorService: CollocutorService,
    private dealSerice: DealService
  ) { }

  ngOnInit() {
    this.getDealData();
    
    this._createForm();
    

  }

  private getDealData() {
    this.collocutorService.collocutorData$
    .pipe(filter((res: any)=> !!res))
    .subscribe(res => {
      this.collocutorData = res;
      console.log(this.collocutorData)
      this.checkIsUserFreelancer();
    });
  }

  public getQuality(n, control){
    this.qualityRating = n;
    this.rateForm.controls[control].setValue(n);

  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    if (this.collocutorData.freelancer_id === +userId) {
      this.isUserFreelancer = true;
    }
    this.userType = this.isUserFreelancer === true? 'Freelancer' : 'Customer'
  }

  public getTerm(n, control){
    this.termRating = n;
    this.rateForm.controls[control].setValue(n);

  }
  public getCivility(n: any, control){
    this.civilityRating = n;
    this.rateForm.controls[control].setValue(n);

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

  public submitRating() {
    this.submit = true;

    if(this.rateForm.invalid) {
      return
    }

    this.rateForm.controls['offerId'].setValue(this.offer_id);
    this.rateForm.controls['userId'].setValue(this.getCollocutorId());
    this.rateForm.controls['dealId'].setValue(this.collocutorData.id);
    let type = this.isUserFreelancer? 'Customer' : "Deal";
    this.dealSerice.setDealRate(this.rateForm.value, type)
    .subscribe(res => {
      if(res === 'ok') {
        this.rated = true;
      }
    })
  }

  private getCollocutorId() {
    return this.userId === this.collocutorData.freelancer_id ? this.collocutorData.customer_id : this.collocutorData.freelancer_id;
  }
}
