import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private router: Router
  )
  { }

  handleError(error: any): void {
    console.log(error)
    this.router.navigate(['/error'], {
      state: {
        'exception': JSON.stringify(error)
      }
    })
  }

}
