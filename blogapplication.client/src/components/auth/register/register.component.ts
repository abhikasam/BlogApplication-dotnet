import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../../directives/custom-validator.directive';
import { AuthService } from '../../../services/auth.service';
import { ResponseMessage } from '../../../model/response-message.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordValidator: RegExp = /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  nameValidator: RegExp = /^[a-zA-Z][a-zA-Z ]+$/;

  responseMessage: ResponseMessage = new ResponseMessage()

  registerForm: FormGroup = new FormGroup({})
  displayValidation: DisplayValidation = new DisplayValidation()
  submitButtonClicked: boolean=false

  constructor(
    private fb: FormBuilder,
    private customValidators: CustomValidatorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', {
        validators: [Validators.required, Validators.pattern(this.nameValidator)],
        updateOn:'change'
      }],
      lastName: ['', {
        validators: [Validators.required, Validators.pattern(this.nameValidator)],
        updateOn:'change'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.customValidators.uniqueEmailValidator()],
        updateOn:'blur'
      }],
      password: ['', {
        validators: [Validators.required, Validators.pattern(this.passwordValidator)],
        updateOn:'change'
      }],
      confirmPassword: ['', {
        validators: [Validators.required, Validators.pattern(this.passwordValidator)],
        updateOn:'change'
      }]
    })
  }

  onSubmit() {
    this.submitButtonClicked = true
    this.displayValidation.displayAll()
    this.authService.registerUser(this.registerForm.value).subscribe(res => {
      this.responseMessage = res;
      if (this.responseMessage.statusCode === 1) {
        setTimeout(() => {
          this.router.navigate(['/auth/login'])
        }, 1000)
      }
    })
  }



}

class DisplayValidation {
  constructor(
    public firstName: boolean = false,
    public lastName: boolean = false,
    public email: boolean = false,
    public password: boolean = false,
    public confirmPassword : boolean = false
  ) { }

  displayAll() {
    this.firstName = true
    this.lastName = true
    this.email = true
    this.password = true
    this.confirmPassword=true
  }

}
