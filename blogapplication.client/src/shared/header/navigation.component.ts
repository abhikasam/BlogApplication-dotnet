import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { RouteInfo } from '../sidebar/sidebar.metadata';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  navItems: RouteInfo[]=[]

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  )
  { }


  ngOnInit(): void {
    this.authService.menuItems.subscribe(items => {
      this.navItems = items
    })
  }
}
