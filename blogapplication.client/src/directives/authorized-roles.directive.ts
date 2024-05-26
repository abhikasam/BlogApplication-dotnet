import { Directive, Injectable, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[authroles]'
})
@Injectable({
    providedIn:'root'
})
export class AuthorizedRolesDirective {
  private roles: string[] = []
  
  @Input() set authroles(allowedRoles: string[]) {
    this.roles = allowedRoles
    this.updateView()
  }

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  )
  {
    this.updateView()
  }


  updateView() {
    this.viewContainer.clear()
    const userroles = this.authService.getRoles()
    if (!this.roles.length || this.roles.some(r => userroles.includes(r))) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
