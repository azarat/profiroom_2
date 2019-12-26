import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/authorization-page/authentification-page/registration-page/registration-page.component';
import { filter } from 'rxjs/operators';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-security-mail-user-settings',
  templateUrl: './security-mail-user-settings.component.html',
  styleUrls: ['./security-mail-user-settings.component.scss']
})
export class SecurityMailUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  public submitedMailForm = false;
  public changeMailResult = null;

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
      // console.log(this.mailForm.controls.oldMail.status);
      console.log(this.mailForm.status);

    });
  }

  updateMail(form: FormGroup ) {
    console.log('formData', form.value);
    this.submitedMailForm = true;
    if (this.mailForm.status === 'INVALID') {
      return;
    }

    this.userSettingsService.updateUserMailAccess(form.value)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        console.log(res);
        if (this.submitedMailForm && res.message === 'succes') {
          this.changeMailResult = true;
        } else {
          this.changeMailResult = false;
          // this.submitedMailForm = false;
          console.log(this.changeMailResult);
        }
      }
    );
  }

}
