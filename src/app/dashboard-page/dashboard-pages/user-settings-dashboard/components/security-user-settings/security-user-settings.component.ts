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
  public submited = false;

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      oldMail: ['', [Validators.required]],
      newMail: ['', [Validators.required]],
      copyNewMail: ['', [Validators.required]],
      passwords: this.formBuilder.group({
        newPassword: ['' , Validators.compose([
          // 1. Password Field is Required
          Validators.required,

          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // // 5. check whether the entered password has a special character
          // tslint:disable-next-line: max-line-length
          CustomValidators.patternValidator( /^(?=.*[!@#\$%\^&\*])/, { hasSpecialCharacters: true }),
          // 6.; Has; a; minimum; length; of; 8; characters;  (?=.{6,100})
          CustomValidators.patternValidator(/(?=.{8,100})/, { minLengthCharacters: true })]) ],

        confirmPassword: ['', [Validators.required]]
      }, { validator: this.checkPasswords })
    });

    // console.log(this.myForm.controls.passwords.controls.newPassword);
    this.myForm.valueChanges.subscribe((value) => console.log(value));
    this.myForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  updateSettings(form: FormGroup ) {
    console.log('formData', form.value);
    this.userSettingsService.updateUserSecurityAccess(form.value)
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


