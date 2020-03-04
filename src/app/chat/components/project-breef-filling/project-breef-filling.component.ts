import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { ChatService } from '../../services/chat.service';
import { Breef } from 'src/app/models/user-services/user-service.model';
import { plainToClass } from 'class-transformer';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-project-breef-filling',
  templateUrl: './project-breef-filling.component.html',
  styleUrls: ['./project-breef-filling.component.scss']
})
export class ProjectBreefFillingComponent implements OnInit {

  @Input() collocutorData: CollucutorsListInterface;
  @Input() exitFromBreefPopUpVisible: boolean;

  @Output() exitFromBreefPopUpVisibleChange = new EventEmitter<boolean>();
  @Output() resetChat = new EventEmitter<boolean>();

  public brefForm: FormGroup;
  config: any[] = [];
  offerBreef: any;

  constructor(
    private chatSerrvice: ChatService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
    this.getOffer();

  }

  private getOffer() {
    this.chatSerrvice.getBreef(+this.collocutorData.offers_id)
      .subscribe((res: any) => {
        this.offerBreef = res.offerBreef;
        console.log('offer bref',this.offerBreef);
        this.createFormGroup();
      });
  }

  private createFormGroup() {
    this.brefForm = this.fb.group({});
    this.offerBreef.forEach((el: Breef) => {
      if (el.breefAnswerType === 'radio') {
        this.brefForm.addControl(el.breefTitle, new FormArray([]));
      } else {
        this.brefForm.addControl(el.breefTitle, this.fb.control(null));
      }
    });
  }

  sendBreef() {
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');

    this.chatSerrvice.sendBreef(this.collocutorData.id, this.brefForm.value)
    .subscribe(res => {

      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {dealId: this.collocutorData.id},
      });
    })
  }

  public onCheckChange(event: any, formControllName: string) {
    const formArray: FormArray = this.brefForm.get(formControllName) as FormArray;

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

  // open Attention Breef PopUp
  public deleteBreef() {
    this.exitFromBreefPopUpVisible = true;
    this.exitFromBreefPopUpVisibleChange.emit(this.exitFromBreefPopUpVisible);
  }

  public returnToBreef() {
    this.exitFromBreefPopUpVisible = null;
    this.exitFromBreefPopUpVisibleChange.emit(this.exitFromBreefPopUpVisible);
  }

  public confirmDeleteBreef() {
  this.chatSerrvice.deleteDeal(this.collocutorData.id)
  .subscribe(res => {
    if (res === 'ok') {
      this.returnToBreef();
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
