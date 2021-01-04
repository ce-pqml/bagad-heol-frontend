import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Play, Envelope, FileEarmark, House, Image, QuestionCircle, ChevronDoubleRight, ChevronDoubleLeft, PersonBadge, List } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import * as menuAsideActions from '../../redux/menu-aside/actions';

const CustomToggle = React.forwardRef(({ children, onClick, className }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={"dropdown-btn " + className}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      // <div
      //   ref={ref}
      //   style={style}
      //   className={className}
      //   aria-labelledby={labeledBy}
      // >
      <ul ref={ref} aria-labelledby={labeledBy} className={"list-unstyled " + className}>
        {React.Children.toArray(children).filter(
          (child) =>
            !value || child.props.children.toLowerCase().startsWith(value),
        )}
      </ul>
      // </div>
    );
  },
);

export class MenuAside extends Component {
  static propTypes = {
    podcast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  setCurrentPage(value){
    this.props.actions.setCurrentPage(value);
    value = JSON.stringify(value);
    localStorage.setItem("currentPage", value);
  }

  setMenuRetract(){
    let bool = !this.props.menuAside.menuRetract;
    localStorage.setItem("menuRetract", JSON.stringify(bool));
    this.props.actions.setMenuRetract(bool);
    
    let element = document.getElementById("sidebar");
    element.classList.toggle("active");
  }

  collapse() {
    let element = document.getElementById("sidebar");
    element.classList.toggle("active");
  }

  render() {
    console.log(this.props.menuAside.menuRetract)
    return (
      <nav id="sidebar" className={this.props.menuAside.menuRetract ? "active" : ""}>
        <div id="sidebarCollapse" className="justify-content-center align-items-center" onClick={(e) => this.collapse()}>
          <List />
        </div>
        <div class="sidebar-header">
          <h3>Bagad Heol</h3>
          <strong>BH</strong>
        </div>

        <ul class="list-unstyled components">
          <li className={this.props.menuAside.currentPage === "Accueil" ? "active" : ""} onClick={(e) => this.setCurrentPage("Accueil")}>
            <Link to="/">
              <House />
              <span>Accueil</span>
            </Link>
            {/* <a href="/" className="d-flex align-items-center">
              <House />
              <span>Accueil</span>
            </a> */}
          </li>
          <li className={this.props.menuAside.currentPage === "Player" ? "active player-btn-menu" : "player-btn-menu"} onClick={(e) => this.setCurrentPage("Player")}>
            {/* <a href="/player" className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.752 58.752" width="1em" height="1em" fill="currentColor">
              <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
                c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
                c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
                c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
                c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
                C49.663,29.47,49.611,29.561,49.524,29.612z"/>
              </svg>
              <span>Player</span>
            </a> */}
            <Link to="/player">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.752 58.752" width="1em" height="1em" fill="currentColor">
                <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
                  c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
                  c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
                  c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
                  c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
                  C49.663,29.47,49.611,29.561,49.524,29.612z"/>
              </svg>
              <span>Player</span>
            </Link>
          </li>
          {/* <li className={this.props.menuAside.currentPage === "Pages" ? "active" : ""} onClick={(e) => this.setCurrentPage("Pages")}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} className="d-flex align-items-center">
                <FileEarmark />
                <span>Pages</span>
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu} className="dropdown-collapse-custom">
                <li><Dropdown.Item href="#/action-1">Action</Dropdown.Item></li>
                <li><Dropdown.Item href="#/action-2">Another action</Dropdown.Item></li>
                <li><Dropdown.Item href="#/action-3">Something else</Dropdown.Item></li>
              </Dropdown.Menu>
            </Dropdown>
          </li> */}
          <li className={this.props.menuAside.currentPage === "Equipe" ? "active" : ""} onClick={(e) => this.setCurrentPage("Equipe")}>
            {/* <a href="#" className="d-flex align-items-center">
              <Image />
              <span>Equipe</span>
            </a> */}
            <Link to="/equipe">
              <Image />
              <span>Equipe</span>
            </Link>
          </li>
          <li className={this.props.menuAside.currentPage === "FAQ" ? "active" : ""} onClick={(e) => this.setCurrentPage("FAQ")}>
            {/* <a href="#" className="d-flex align-items-center">
              <QuestionCircle />
              <span>FAQ</span>
            </a> */}
            <Link to="/faq">
              <QuestionCircle />
              <span>FAQ</span>
            </Link>
          </li>
          <li className={this.props.menuAside.currentPage === "Contact" ? "active" : ""} onClick={(e) => this.setCurrentPage("Contact")}>
            {/* <a href="#" className="d-flex align-items-center">
              <Envelope />
              <span>Contact</span>
            </a> */}
            <Link to="/contact">
              <Envelope />
              <span>Contact</span>
            </Link>
          </li>
          <li className={this.props.menuAside.currentPage === "EspaceMembre" ? "active" : ""} onClick={(e) => this.setCurrentPage("EspaceMembre")}>
            {/* <a href="#" className="d-flex align-items-center">
              <Image />
              <span>Equipe</span>
            </a> */}
            <Link to="/espace-membre">
              <PersonBadge />
              <span>Espace Membre</span>
            </Link>
          </li>
          <li id="retractInsideMenu" onClick={(e) => this.setMenuRetract()}>
            <a href="#" className="d-flex justify-content-end align-items-center" onClick={(e) => e.preventDefault()}>
              {/* <ChevronDoubleRight /> */}
              {this.props.menuAside.menuRetract ? <ChevronDoubleRight /> : <ChevronDoubleLeft />}
              <span>fermer</span>
            </a>
          </li>
        </ul>

        {/* <ul class="list-unstyled CTAs">
          <li>
            <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
          </li>
          <li>
            <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
          </li>
        </ul> */}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuAside: state.menuAside,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...menuAsideActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuAside);

