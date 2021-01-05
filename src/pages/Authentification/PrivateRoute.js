import React from 'react';

function PrivateRoute() {
  return (
    <div className="private-route">
        <h1>Vous devez vous connecter pour accéder à cette page</h1>
    </div>
  );
}

PrivateRoute.propTypes = {};
PrivateRoute.defaultProps = {};

export default PrivateRoute;
