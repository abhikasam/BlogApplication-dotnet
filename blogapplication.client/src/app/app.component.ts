import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }  title = 'angularproject.client';
}
