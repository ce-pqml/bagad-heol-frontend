import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Register extends Component{

  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render(){
    return(
      <Container className="register bg-bagad-heol" fluid>
        <Container className="mb-5">
          <Row>
            <Col className="text-center">
              <Image src={logo} roundedCircle className="block-bagad-heol" />
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol">
          <Row className="mb-4">
            <Col>
              <label>Identifiant</label>
              <input type="text" placeholder="Entrer un nom d'utilisateur" name="username" className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <label>Email</label>
              <input type="password" placeholder="Entrer votre email" name="email"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <label>Vérification de l'email</label>
              <input type="password" placeholder="Confirmer votre email" name="email-confirm"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <label>Mot de passe</label>
              <input type="password" placeholder="Entrer le mot de passe" name="password"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Vérification du mot de passe</label>
              <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex justify-content-end">
              <input type="submit" id='submit' value='Créer un compte' className="btn-bagad-heol"/>
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol-mdp mb-5">
          <Row>
            <Col>
              <Link to={"/login"} className="btn-bagad-heol-mdp">
                J'ai déjà un compte !
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      // <div className="register">
      //   <div className="screen-1">
      //     <body id="body">
      //     <img id="logo_bagad" src={logo} alt="Bagad_Heol"/>
      //     <div id="container">
      //       <h1>Se connecter</h1>
      //       <label><b>Identifiant*</b></label>
      //       <input type="text" placeholder="Entrer un nom d'utilisateur" name="username" required/>
      //       <label><b>Email*</b></label>
      //       <input type="text" placeholder="Entrer votre email" name="email" required/>
      //       <label><b>Vérification de l'email*</b></label>
      //       <input type="text" placeholder="Confirmer votre email" name="email" required/>
      //       <label><b>Mot de passe*</b></label>
      //       <input type="password" placeholder="Entrer un mot de passe" name="password" required/>
      //       <label><b>Vérification du mot de passe*</b></label>
      //       <input type="password" placeholder="Confirmer votre mot de passe" name="password" required/>
      //       <input type="submit" id='submit' value='Créer un compte'/>
      //     </div>
      //     </body>
      //   </div>
      // </div>
    );
  }
}
Register.propTypes = {};
Register.defaultProps = {};

export default Register;