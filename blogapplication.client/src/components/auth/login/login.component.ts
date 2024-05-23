import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ResponseMessage } from '../../../model/response-message.model';
import { Login } from '../../../model/login.model';
import { UserDetails } from '../../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseMessage = new ResponseMessage();
  loginForm: FormGroup = new FormGroup({})

  showEmailValidators = false;
  showPasswordValidators = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      rememberme: [false]
    })
  }

  onSubmit() {

    this.authService.loginUser(this.loginForm.value).subscribe(response => {
      this.responseMessage = response;
      if (this.responseMessage.statusCode === 1) {
        let userDetails: UserDetails = JSON.parse(JSON.stringify(response.data))

        sessionStorage.setItem('authenticated', 'true')
        sessionStorage.setItem('claims', JSON.stringify(userDetails.claims))
        sessionStorage.setItem('roles', JSON.stringify(userDetails.roles))

        this.authService.authenticated = true;
        this.authService.updateSidebar()
        this.authService.updateMenubar()
        this.authService.userDetails.next(userDetails)
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1000)
      }
    })

  }

}
