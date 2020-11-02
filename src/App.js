import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import AppRoute from './components/AppRoute';
import routes from './config/routes';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Switch>
//         {routes.map(route => (
//           <AppRoute 
//             key={route.path}
//             path={route.path}
//             component={route.component}
//             isPrivate={route.isPrivate}
//           />
//         ))}
//       </Switch>
//     </Router>
//   )
// }

// export default connect() (App);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(route => (
            <AppRoute 
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            >
              <Switch>
                {route.childRoutes.map(child => (
                  <AppRoute 
                    key={child.path}
                    path={child.path}
                    component={child.component}
                    isPrivate={child.isPrivate}
                  />
                ))}
              </Switch>
            </AppRoute>
          ))}
        </Switch>
      </Router>
    );
  }
}


export default App;
