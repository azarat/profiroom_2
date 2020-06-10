import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  CollocutorInterface
} from '../../interfaces/collocutor.interface';
import {
  ChatService
} from '../../services/chat.service';
import {
  plainToClass
} from 'class-transformer';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  LocalizeRouterService
} from 'localize-router';
import {
  DealService
} from '../../services/deal.service';
import {
  CollocutorService
} from '../../services/collocutor.service';
import {
  filter,
  first
} from 'rxjs/operators';
import {
  Brief
} from 'src/app/models/user-services/brief.model';

@Component({
  selector: 'app-project-brief-filling',
  templateUrl: './project-brief-filling.component.html',
  styleUrls: ['./project-brief-filling.component.scss']
})
export class ProjectBriefFillingComponent implements OnInit {

  public collocutorData: CollocutorInterface;
  @Input() exitFromBriefPopUpVisible: boolean;

  @Output() exitFromBriefPopUpVisibleChange = new EventEmitter<boolean>();
  @Output() resetChat = new EventEmitter<boolean>();

  public briefForm: FormGroup;
  config: any[] = [];
  public offerBrief: Brief[];
  public submitted = null;
  constructor(
    private dealService: DealService,
    private collocutorSevice: CollocutorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
    this.getCollocutorData();


  }

  private getCollocutorData() {
    this.collocutorSevice.collocutorData$
      .pipe(
        filter((res: any) => !!res),
        first()
      )
      .subscribe(res => {
        this.collocutorData = res;
        this.getOfferBrief();
      })
  }

  private getOfferBrief() {
    this.dealService.getBrief(+this.collocutorData.offers_id)
      .pipe(filter((res: any) => !!res))
      .subscribe((res: any) => {
        this.offerBrief = res.brief;
        console.log(this.offerBrief)
        this.createFormGroup();
      });
  }

  private createFormGroup() {
    this.briefForm = this.fb.group({});
    this.offerBrief.forEach((el: Brief) => {
      if (el.answer_type === 'radio') {
        if (el.answer_required === '1') {
          this.briefForm.addControl(el.title, new FormArray([], [Validators.required]));
        } else {
          this.briefForm.addControl(el.title, new FormArray([]));
        }
      } else {
        if (el.answer_required === '1') {
          this.briefForm.addControl(el.title, this.fb.control(null, Validators.required));
        } else {
          this.briefForm.addControl(el.title, this.fb.control(null));
        }
      }
    });
  }

  sendBrief() {
    this.submitted = true;
    if (this.briefForm.invalid) {
      return;
    }
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');

    this.dealService.sendBeef(this.collocutorData.id, this.briefForm.value)
      .subscribe(res => {

        this.router.navigate([translatedPath], {
          relativeTo: this.route,
          queryParams: {
            dealId: this.collocutorData.id
          },
        });
      });
  }

  public onCheckChange(event: any, formControlName: string) {
    const formArray: FormArray = this.briefForm.get(formControlName) as FormArray;

    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i = 0;

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
    this.dealService.deleteDeal(this.collocutorData.id)
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
