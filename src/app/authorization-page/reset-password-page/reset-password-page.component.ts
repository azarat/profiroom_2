import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  public resetPass: FormGroup;
  submitted = false;
  message: InfoMessageInterface | boolean;
  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService
  ) { }

  ngOnInit() {
    this.resetPass = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ]
    });
  }

  ResetPass() {
    this.submitted = true;
    if (this.resetPass.invalid) {
      return;

    }
    this.authentificationService.resetPass(this.resetPass.value).subscribe(
      res => {
      this.message = {
        title: 'Запрос одобрен!',
        description: 'На указанную Вами почту придёт письмо для создания нового пароля.'
      };
    },
    erorr => {
      this.message = {
        title: 'Ошибка',
        description: 'Этот Email не зарегистрирован'
      };
    });
  }
}
