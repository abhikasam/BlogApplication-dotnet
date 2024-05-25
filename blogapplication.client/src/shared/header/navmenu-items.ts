import { RouteInfo } from "../sidebar/sidebar.metadata";

export const MENUBAR_ROUTES: RouteInfo[] = [
  {
    path: '/auth/login',
    title: 'Login',
    icon: '',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [false],
    roles: [],
    claims: []
  },
  {
    path: '/auth/register',
    title: 'Register',
    icon: '',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [false],
    roles: [],
    claims: []
  },
  {
    path: '/userarticlelike/user',
    title: 'Liked',
    icon: '',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  },
  {
    path: '/userarticlepin/user',
    title: 'Pinned',
    icon: '',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true],
    roles: [],
    claims: []
  }
]
