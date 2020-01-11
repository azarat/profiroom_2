import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/authorization-page/authentification-page/registration-page/registration-page.component';
import { filter } from 'rxjs/operators';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-security-pass-user-settings',
  templateUrl: './security-pass-user-settings.component.html',
  styleUrls: ['./security-pass-user-settings.component.scss']
})
export class SecurityPassUserSettingsComponent implements OnInit {
  @Input() userSettings: UserSettingsModel;

  public submitedPassForm = false;
  public changePasswordResult = null;

  passForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit() {
    this.passForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      passwords: this.formBuilder.group(
        {
          newPassword: [
            '',
            Validators.compose([
              // 1. Password Field is Required
              Validators.required,

              CustomValidators.patternValidator(/\d/, { hasNumber: true }),
              // // 3. check whether the entered password has upper case letter
              CustomValidators.patternValidator(/[A-Z]/, {
                hasCapitalCase: true
              }),
              // // 4. check whether the entered password has a lower-case letter
              CustomValidators.patternValidator(/[a-z]/, {
                hasSmallCase: true
              }),
              // // 5. check whether the entered password has a special character
              // tslint:disable-next-line: max-line-length
              CustomValidators.patternValidator(/^(?=.*[!@#\$%\^&\*])/, {
                hasSpecialCharacters: true
              }),
              // 6.; Has; a; minimum; length; of; 8; characters;  (?=.{6,100})
              CustomValidators.patternValidator(/(?=.{8,100})/, {
                minLengthCharacters: true
              })
            ])
          ],

          newPassword_confirmation: ['', [Validators.required]]
        },
        { validator: this.checkPasswords }
      )
    });

    this.passForm.valueChanges.subscribe(value => console.log(value));
    this.passForm.statusChanges.subscribe(status => {
      console.log(status);
    });
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('newPassword_confirmation').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  updatePass(form: FormGroup) {

    this.submitedPassForm = true;
    if (this.passForm.status === 'INVALID') {
      return;
    }

    this.userSettingsService
      .updateUserPassAccess(form.value)
      .pipe(filter((res: any) => !!res))
      .subscribe(res => {
        console.log(res);
        if (this.submitedPassForm && res.message === 'succes') {
          this.changePasswordResult = true;
        } else {
          this.changePasswordResult = false;
          this.submitedPassForm = false;
          console.log(this.changePasswordResult);
        }
      });
  }
}
