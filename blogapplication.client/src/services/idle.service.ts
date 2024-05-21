import { Injectable, NgZone, OnInit } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { fromEvent, mapTo } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService implements OnInit {

  constructor(
    public idle: Idle,
    private ngZone: NgZone
  )
  {  }

  ngOnInit(): void {
    this.monitorVisibility()
    this.idle.onIdleEnd.subscribe(() => {
      this.idleEndCallApi()
    })
  }

  idleEndCallApi() {
    console.log('idle end call api')
  }

  private monitorVisibility() {
    this.ngZone.runOutsideAngular(() => {
      const visibility$ = fromEvent(document, 'visibilitychange').pipe(
        mapTo(document.visibilityState)
      );

      visibility$.subscribe(state => {
        if (state === 'visible') {
          console.log('Page is visible.');
          this.idleEndCallApi();
        }
      });
    });
  }

}
