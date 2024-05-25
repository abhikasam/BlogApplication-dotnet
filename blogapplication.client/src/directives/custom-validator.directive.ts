import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor(
    private authService: AuthService
  ) { }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.authService.getUser(control.value).pipe(map(unique => {
        return unique ? { "uniqueEmail": true } : null
      }))
    }
  }

}
