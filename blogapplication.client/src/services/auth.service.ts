import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { ResponseMessage } from '../model/response-message.model';
import { Login } from '../model/login.model';
import { BehaviorSubject } from 'rxjs';
import { UserDetails, UserSession } from '../model/user.model';
import { RouteInfo } from '../shared/sidebar/sidebar.metadata';
import { MENUBAR_ROUTES, SIDEBAR_ROUTES } from '../shared/sidebar/menu-items';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false
  roles: string[] = []
  claims: string[] = []


  userDetails = new BehaviorSubject<UserDetails>(new UserDetails())

  sidebarItems = new BehaviorSubject<RouteInfo[]>([])
  menuItems = new BehaviorSubject<RouteInfo[]>([])


  constructor(private http: HttpClient) { }

  getUser(email: string) {
    return this.http.get<boolean>('/api/register?email='+email)
  }

  registerUser(register: any) {
    return this.http.post<ResponseMessage>('/api/register', register)
  }

  loginUser(login: any) {
    return this.http.post<ResponseMessage>('/api/login',login)
  }

  getUserSession() {
    return this.http.get<UserSession>('/api/login')
  }

  updateSidebar() {
    var routes = SIDEBAR_ROUTES
    routes = routes.filter(i => i.authenticated.includes(this.authenticated))
    this.sidebarItems.next(routes)
  }

  updateMenubar() {
    var routes = MENUBAR_ROUTES
    routes = routes.filter(i => i.authenticated.includes(this.authenticated))
    this.menuItems.next(routes)
  }
}
