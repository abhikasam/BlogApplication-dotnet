import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private router: Router,
    private authService: AuthService
  )
  { }

  handleError(error: HttpErrorResponse): void {
    if (error.status == 401) {
      this.authService.signout()
    }
    this.router.navigate(['/error'], {
      state: {
        'exception': JSON.stringify(error)
      }
    })
  }

}
