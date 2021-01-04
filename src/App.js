import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
// import './App.scss';
import AppRoute from './components/AppRoute';
import routes from './config/routes';
import MenuAside from './components/MenuAside/MenuAside';
import { List } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

class App extends Component {
  collapse() {
    let element = document.getElementById("sidebar");
    element.classList.toggle("active");
  }

  // render() {
  //   return (
  //     <Router>
  //       <div className="wrapper">
  //         {/* <MenuAside /> */}
  //         <Container fluid className="p-0">
  //           <div id="sidebarCollapse" className="justify-content-center align-items-center" onClick={(e) => this.collapse()}>
  //             <List />
  //           </div>
  //           <AppRoute />
  //         </Container>
  //       </div>
  //     </Router>
  //   );
  // }

  render() {
    return (
      <Router>
        <AppRoute />
      </Router>
    );
  }
}


export default App;
