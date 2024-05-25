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
  }
];

