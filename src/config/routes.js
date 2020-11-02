import pages from '../pages';
import {
    VIEW_HOME_PATH,
    VIEW_AUTH_PATH
} from './paths';

export const VIEW_HOME = {
    path: VIEW_HOME_PATH,
    component: pages.Home,
    childRoutes: [
        {path:'/login', component: pages.Authentification, /*isIndex: true*/},
        {path:'', component: pages.Home, /*isIndex: true*/},
    ]
};

export default [VIEW_HOME];