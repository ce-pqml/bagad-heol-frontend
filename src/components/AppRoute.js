import React from 'react';
import { Route } from 'react-router-dom';

export default function AppRoute({
  component: Component,
  path,
  isPrivate,
  exact = false,
  children,
  ...props
}) {
  return (
    <Route
      path={path}
      render={props => isPrivate ? (
        <div>Merci de vous connectez</div>
      ) : (
        <Component {...props} />
      )}
      {...props}
    >
      {children}
    </Route>
  );
}