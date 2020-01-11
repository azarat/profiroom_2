import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';

import { filter } from 'rxjs/operators';
import { UserOffersService } from '../../../services/user-offers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-second-step-creation',
  templateUrl: './second-step-creation.component.html',
  styleUrls: ['./second-step-creation.component.scss']
})
export class SecondStepCreationComponent implements OnInit {

  config = {
    toolbar: [[ 'bold', 'italic', 'underline', ],
    [{ list: 'bullet' }] ]
  };

  characterLength: number = null;
  descriptionForm: FormGroup;
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services');

  public editor;
  constructor(
    private userOffersService: UserOffersService,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();

  ngOnInit() { }

  onEditorCreated = ( event: any ) => {
    this.characterLength = event.editor.container.innerText.replace(/\s+/g, '').length;
    // this.editor = event;
  }
  nextStep = (form: NgForm) => {

    if (!form.valid || this.characterLength < 100 || this.characterLength > 300) {
      return;
    }
    this.userOffersService.updateService(this.userService)
    .pipe(filter((res: any) => !! res))
    .subscribe(res => {
      this.userService.step = res.step;
    } );

  }

  quite = () => {
    this.router.navigate([this.translatedPath]);
  }

}
