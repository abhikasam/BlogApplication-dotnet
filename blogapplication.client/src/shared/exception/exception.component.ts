import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
  @Input() exception: HttpErrorResponse = new HttpErrorResponse({})

  constructor(
    private router: Router,
    private http: HttpClient
  )
  { }

  ngOnInit(): void {
    var navigation = this.router.getCurrentNavigation()
    var exception = '';
    if (navigation?.extras.state) {
      exception = (navigation.extras.state as any).exception
    }
    else {
      exception = (window.history.state as any).exception
    }
    console.log(exception)
    this.exception = JSON.parse(exception)
  }

  tryagain() {
    if (this.exception.url) {
      this.http.get(this.exception.url)
    }
  }
}
