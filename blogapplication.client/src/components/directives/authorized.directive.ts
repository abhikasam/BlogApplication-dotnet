import { Directive, Injectable, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[authorized]'
})
export class AuthorizedDirective implements OnInit {
  private authType: boolean=false;

  @Input() set authorized(authType: boolean) {
    this.authType = authType
    console.log(this.authType)
  }

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  )
  {
  }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(res => {
      this.updateView(res)
    })
}

  updateView(current:boolean) {
    this.viewContainerRef.clear()
    console.log(current, this.authType)
    if (current === this.authType) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }


}
