import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
// import './App.scss';
import AppRoute from './components/AppRoute';
import routes from './config/routes';
import MenuAside from './components/MenuAside/MenuAside';
import { List } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

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
  collapse() {
    let element = document.getElementById("sidebar");
    element.classList.toggle("active");
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <MenuAside />
          <Container fluid className="p-0">
            <div id="sidebarCollapse" className="justify-content-center align-items-center" onClick={(e) => this.collapse()}>
              <List />
            </div>
            <AppRoute />
          </Container>
        </div>
        
        {/* <Switch>
          <Route exact path="/login" render={() => <div>Login</div>} /> 
          <Route exact path={["/", "/contact"]}>
            <h1>TITLE</h1>
            <Switch>
              <Route exact path="/" render={() => <div>Home</div>} />
              <Route exact path="/contact" render={() => <div>Contact</div>} />
            </Switch>
          </Route>    
          <Route exact path={["/admin", "/admin/test", "/admin/test2"]}>
            <Switch>
              <Route exact path="/admin/" render={() => <div>test0 admin</div>} />
              <Route exact path="/admin/test" render={() => <div>test1 admin</div>} />
              <Route exact path="/admin/test2" render={() => <div>test2 admin</div>} />
            </Switch>
          </Route>
          <Route exact path="*" render={() => <div>404</div>} /> */}
          
          {/* {routes.map(route => (
            <AppRoute 
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            >
              <Switch>
                {route.childRoutes && route.childRoutes.map(child => (
                  <AppRoute 
                    key={child.path}
                    path={child.path}
                    component={child.component}
                    isPrivate={child.isPrivate}
                  />
                ))}
              </Switch>
            </AppRoute>
          ))} */}
        {/* </Switch> */}
      </Router>
    );
  }
}


export default App;
