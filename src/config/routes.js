import pages from '../pages';
import {
    VIEW_HOME_PATH,
    VIEW_AUTH_PATH,
    VIEW_ADMIN_PATH
} from './paths';

export const VIEW_HOME = {
    path: '/',
    // layout: (<div>Ceci est un Layout</div>),
    childRoutes: [
        {path:'/', component: pages.Home},
        {path:'/contact', component: pages.Authentification},
        {path:'/login', component: pages.Authentification},
    ]
};

export const VIEW_ADMIN = {
    path: '/admin',
    // layout: pages.Home,
    childRoutes: [
        {path:'/', component: pages.Authentification},
        {path:'/test', component: pages.Authentification},
    ]
};

export const ERROR = {
    path: '*',
    component: pages.Error404,
};

export default [VIEW_HOME, VIEW_ADMIN, ERROR];