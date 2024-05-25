import { RouteInfo } from './sidebar.metadata';

export const SIDEBAR_ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true,false],
    roles: [],
    claims:[]
  },
  {
    path: '/articles',
    title: 'Articles',
    icon: 'bi bi-newspaper',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims:[]
  },
  {
    path: '/categories',
    title: 'Categories',
    icon: 'bi bi-tag-fill',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims:[]
  },
  {
    path: '/authors',
    title: 'Authors',
    icon: 'bi bi-person-bounding-box',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/component/card',
    title: 'Card',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/component/dropdown',
    title: 'Dropdown',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/component/pagination',
    title: 'Pagination',
    icon: 'bi bi-dice-1',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/component/nav',
    title: 'Nav',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/component/table',
    title: 'Table',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  }
];

