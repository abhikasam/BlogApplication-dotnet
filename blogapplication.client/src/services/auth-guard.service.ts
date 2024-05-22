import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private router: Router, private authService:AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    console.log(this.authService.isAuthenticated)

    //if user has to be not authenticated 
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['access-denied'])
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
}
