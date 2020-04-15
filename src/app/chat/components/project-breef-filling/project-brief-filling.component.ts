import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { ChatService } from '../../services/chat.service';
import { Brief } from 'src/app/models/user-services/user-service.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-project-brief-filling',
  templateUrl: './project-brief-filling.component.html',
  styleUrls: ['./project-brief-filling.component.scss']
})
export class ProjectBriefFillingComponent implements OnInit {

  @Input() collocutorData: CollocutorInterface;
  @Input() exitFromBriefPopUpVisible: boolean;

  @Output() exitFromBriefPopUpVisibleChange = new EventEmitter<boolean>();
  @Output() resetChat = new EventEmitter<boolean>();

  public briefForm: FormGroup;
  config: any[] = [];
  offerBrief: any;
  public submitted = null;
  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
    this.getOffer();

  }

  private getOffer() {
    this.chatService.getBrief(+this.collocutorData.offers_id)
      .subscribe((res: any) => {
        this.offerBrief = res.offerBrief;
        console.log('offer brief',this.offerBrief);
        this.createFormGroup();
      });
  }

  private createFormGroup() {
    this.briefForm = this.fb.group({});
    this.offerBrief.forEach((el: Brief) => {
      if (el.briefAnswerType === 'radio') {
        if(el.briefAnswerRequired === '1') {
          this.briefForm.addControl(el.briefTitle, new FormArray([], [Validators.required]));
        } else {
          this.briefForm.addControl(el.briefTitle, new FormArray([]));
        }
        
      } else {
        if(el.briefAnswerRequired === '1') {
          this.briefForm.addControl(el.briefTitle, this.fb.control(null, Validators.required));
        } else {
          this.briefForm.addControl(el.briefTitle, this.fb.control(null));
        }
       
      }
    });
  }

  sendBrief() {
    this.submitted = true;
    if(this.briefForm.invalid) {
      
      return
    }
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');

    this.chatService.sendBeef(this.collocutorData.id, this.briefForm.value)
    .subscribe(res => {

      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {dealId: this.collocutorData.id},
      });
    })
  }

  public onCheckChange(event: any, formControlName: string) {
    const formArray: FormArray = this.briefForm.get(formControlName) as FormArray;

    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // open Attention Brief PopUp
  public deleteBrief() {
    this.exitFromBriefPopUpVisible = true;
    this.exitFromBriefPopUpVisibleChange.emit(this.exitFromBriefPopUpVisible);
  }

  public returnToBrief() {
    this.exitFromBriefPopUpVisible = null;
    this.exitFromBriefPopUpVisibleChange.emit(this.exitFromBriefPopUpVisible);
  }

  public confirmDeleteBrief() {
  this.chatService.deleteDeal(this.collocutorData.id)
  .subscribe(res => {
    if (res === 'ok') {
      this.returnToBrief();
      const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {},
      });
      this.resetChat.emit(true);
    }
  });
  }
}
