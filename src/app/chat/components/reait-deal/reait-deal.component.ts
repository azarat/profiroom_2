import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
  selector: 'app-rate-deal',
  templateUrl: './rate-deal.component.html',
  styleUrls: ['./rate-deal.component.scss']
})
export class RateDealComponent implements OnInit {
  public starsArr = new Array(5);
  public isHover: boolean = false;
  public quolityRait: number = 0;
  public termRait: number = 0;
  public civilityRait: number = 0;
  public rateForm: FormGroup;
  userId;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this._createForm();
    this.userId = this.localStorageService.getItem('userId').value;
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
      comment: [null]
    });
  }

  public submitRaite() {
    console.log(this.rateForm.value)

  }
}
