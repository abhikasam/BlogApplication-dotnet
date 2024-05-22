import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { ResponseMessage } from '../model/response-message.model';
import { Login } from '../model/login.model';
import { BehaviorSubject } from 'rxjs';
import { UserDetails, UserSession } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false
  userDetails = new BehaviorSubject<UserDetails>(new UserDetails())
  constructor(private http: HttpClient) { }

  getUser(email: string) {
    return this.http.get<boolean>('/api/register?email='+email)
  }

  registerUser(register: any) {
    return this.http.post<ResponseMessage>('/api/register', register)
  }

  loginUser(login: any) {
    console.log(login)
    return this.http.post<ResponseMessage>('/api/login',login)
  }

  getUserSession() {
    return this.http.get<UserSession>('/api/login')
  }
}
