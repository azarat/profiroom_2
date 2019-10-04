import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  public resetPass: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private AuthentificationService: AuthentificationService
  ) { }

  ngOnInit() {
    this.resetPass = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ResetPass() {
    this.submitted = true;
    if (this.resetPass.invalid) {
      return;
    }
    this.AuthentificationService.resetPass(this.resetPass.value).subscribe(res =>{
      console.log(res);
    })
  }
}
