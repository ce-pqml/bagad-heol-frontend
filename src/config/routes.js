import pages from '../pages';
import MenuAside from '../components/MenuAside/MenuAside';
import {
    VIEW_HOME_PATH,
    VIEW_AUTH_PATH,
    VIEW_ADMIN_PATH
} from './paths';

export const VIEW_HOME = {
    path: '/',
    // layout: (<div>Ceci est un Layout</div>),
    layout: (<MenuAside />),
    childRoutes: [
        {path:'/', component: pages.Home},
        {path:'/player', component: pages.Player},
        {path:'/espace-membre', component: pages.EspaceMembre, isPrivate: true},
        {path:'/contact', component: pages.Contact},
        {path:'/login', component: pages.Login},
        {path:'/register', component: pages.Register},
        {path:'/resetpassword', component: pages.AskResetPassword},
        {path:'/resetpassword/new', component: pages.ResetPassword},
    ]
};

export const VIEW_ADMIN = {
    path: '/admin',
    // layout: pages.Home,
    layout: (<MenuAside />),
    childRoutes: [
        {path:'/general', component: pages.AdminGeneral},
        {path:'/podcast', component: pages.AdminPodcast},
        {path:'/ticket/:id', component: pages.AdminTicket},
    ]
};

export const ERROR = {
    path: '*',
    layout: (<MenuAside />),
    component: pages.Error404,
};

export default [VIEW_HOME, VIEW_ADMIN, ERROR];