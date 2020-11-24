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
import { Route, Switch } from 'react-router-dom';
import routes from '../config/routes';

function buildRoute(routes) {
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
        childRoute.push(<Route key={childPath} path={childPath} render={() => isPrivate(child)} exact/>);      
      })
      routeDom.push(<Route key={item.path} path={allChildPath} exact>{layout}<Switch>{childRoute}</Switch></Route>);
    } else {
      routeDom.push(<Route key={item.path} path={item.path} render={() => isPrivate(item)} exact/>);
    }
  });
  
  return <Switch>{routeDom}</Switch>;
}

function isPrivate(item) {
  if (item.isPrivate) {
    return <div>Merci de vous connectez !</div>
  } else {
    return <item.component />
  }
  // return (item.isPrivate ?  : <item.component />)
}

export default function AppRoute() {
  return buildRoute(routes);
}