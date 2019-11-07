import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../../services/user-offers.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-second-step-creation',
  templateUrl: './second-step-creation.component.html',
  styleUrls: ['./second-step-creation.component.scss']
})
export class SecondStepCreationComponent implements OnInit {
  serviceDescriprionForm = {
    description: null,
    step: 2,
    offerId: null
  };
  config = {
    toolbar: [[ 'bold', 'italic', 'underline', ],
    [{ list: 'bullet' }] ]
  };

  descriptionForm: FormGroup;


  public editor;
  constructor(
    private userOffersService: UserOffersService,
    private fb: FormBuilder
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();
  ngOnInit() {


    console.log(this.userService);
    // this.serviceDescriprionForm.offerId = this.userService.id;
    // // if (this.userService.description) {
    // //   this.editor.container.innerHTML = this.userService.description;
    // // }

    this.descriptionForm = this.fb.group({
      description: null,
      step: 2,
      offerId: null
    });
  }

  onEditorCreated(event) {

    this.editor = event;
  }
  registrate() {

    this.descriptionForm.value.offerId = this.userService.id;
    this.descriptionForm.value.step = 2;
    console.log(this.editor);
    this.userOffersService.updateService(this.descriptionForm.value)
    .pipe(filter((res: any)=> !! res))
    .subscribe(res => this.setCurrentStep.emit(2));

  }
  onSubmit() {
  console.log(this.descriptionForm.value.editor);
  }
}
