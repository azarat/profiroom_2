import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/authorization-page/authentification-page/registration-page/registration-page.component';
import { UserSettingsService } from '../../services/user-settings.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-security-user-settings',
  templateUrl: './security-user-settings.component.html',
  styleUrls: ['./security-user-settings.component.scss']
})

export class SecurityUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  public submitedMail = false;
  public submitedMailResult = null;

  mailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit() {

    this.mailForm = this.formBuilder.group({
      oldMail: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]],
      newMail: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]],
      password: ['', [Validators.required]]
    });

    this.mailForm.valueChanges.subscribe((value) => console.log(value));
    this.mailForm.statusChanges.subscribe((status) => {
      console.log(this.mailForm.controls.oldMail.status);
      console.log(this.mailForm);

    });
  }

  updateMail(form: FormGroup ) {
    console.log('formData', form.value);
    this.submitedMail = true;
    this.userSettingsService.updateUserMailAccess(form.value)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        console.log(res);
        // this.userSettingsModel = res;
        // console.log(this.userSettingsModel);
      }
    );
  }
}


