import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

import { filter } from 'rxjs/operators';
import { UserOffersService } from '../../../services/user-offers.service';

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

  descriptionForm: FormGroup;


  public editor;
  constructor(
    private userOffersService: UserOffersService,
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();

  ngOnInit() { }

  onEditorCreated(event) {

    this.editor = event;
  }
  onSubmit() {
    console.log(this.userService);
    this.userOffersService.updateService(this.userService)
    .pipe(filter((res: any) => !! res))
    .subscribe(res => {
      this.userService.step = res.step;
    } );

  }

}
