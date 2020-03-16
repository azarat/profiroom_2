import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
  selector: 'app-rate-deal',
  templateUrl: './rate-deal.component.html',
  styleUrls: ['./rate-deal.component.scss']
})
export class RateDealComponent implements OnInit {

  @Input() offer_id;
  public starsArr = new Array(5);
  public isHover: boolean = false;
  public quolityRait: number = 0;
  public termRait: number = 0;
  public civilityRait: number = 0;
  public rateForm: FormGroup;
  userId = this.localStorageService.getItem('userId').value;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._createForm();

  }

  public getQuolity(n){
    this.quolityRait = n;
    this.rateForm.controls.quality.setValue(n);

  }
  public getTerm(n){
    this.termRait = n;
    this.rateForm.controls.term.setValue(n);

  }
  public getCivility(n: any){
    this.civilityRait = n;
    this.rateForm.controls.civility.setValue(n);

  }

  private _createForm() {
    this.rateForm = this.fb.group({
      quality: [null],
      userId: [this.userId],
      term: [null],
      civility: [null],
      comment: [null],
      offerId: [null]
    });
  }

  public submitRaite() {
    this.rateForm.controls['offerId'].setValue(this.offer_id);
    console.log(this.rateForm.value);

  }
}
