// import React from 'react';
// import { Route } from 'react-router-dom';

// export default function AppRoute({
//   component: Component,
//   path,
//   isPrivate,
//   exact = false,
//   children,
//   ...props
// }) {
//   return (
//     <Route
//       exact
//       path={path}
//       render={props => isPrivate ? (
//         <div>Merci de vous connectez</div>
//       ) : (
//         <Component {...props} />
//       )}
//       {...props}
//     >
//       {children}
//     </Route>
//   );
// }
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setMessage } from '../redux/message/actions';
import routes from '../config/routes';

import PrivateRoute from '../pages/Authentification/PrivateRoute';

function buildRoute(routes, dispatch) {
  let routeDom = [];

  routes.forEach(item => {
    let parentPath = item.path;
    let allChildPath = [];
    let childRoute = [];

    let layout;
    if (item.layout) {
      layout = item.layout
    }

    //On vérifie si la route possède des routes "enfants"
    if (item.childRoutes && item.childRoutes.length > 0) {
      item.childRoutes.forEach(child => {
        let childPath = parentPath == '/' ? child.path : parentPath + child.path;
        allChildPath.push(childPath);
        childRoute.push(<Route key={childPath} path={childPath} render={() => isPrivate(child, dispatch)} exact/>);      
      })
      routeDom.push(<Route key={item.path} path={allChildPath} exact>{layout}<Switch>{childRoute}</Switch></Route>);
    } else {
      // routeDom.push(<Route key={item.path} path={item.path} render={() => isPrivate(item)} exact/>);
      routeDom.push(<Route key={item.path} path={item.path} exact>{layout}{isPrivate(item)}</Route>);
    }
  });
  
  return <Switch>{routeDom}</Switch>;
}

function isPrivate(item, dispatch) {
  if (item.isPrivate) {
    dispatch(setMessage([{
      'status': 'error',
      'type': 'needLogin',
      'message': 'Merci de vous connecter pour accéder à cette page.'
    }]))
    // return <div>Merci de vous connectez !</div>
    // return <PrivateRoute />
    return <Redirect to="/login" />
  } else {
    return <item.component />
  }
  // return (item.isPrivate ?  : <item.component />)
}

export default function AppRoute() {
  const dispatch = useDispatch();

  return buildRoute(routes, dispatch);
}