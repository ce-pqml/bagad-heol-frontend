import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Login extends Component{

  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render(){
    return(
      <Container className="login bg-bagad-heol" fluid>
        <Container className="mb-5">
          <Row>
            <Col className="text-center">
              <Image src={logo} roundedCircle className="block-bagad-heol" />
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol">
          <Row className="mb-3">
            <Col>
              <label>Identifiant</label>
              <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Mot de passe</label>
              <input type="password" placeholder="Entrer le mot de passe" name="password"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex justify-content-end">
              <input type="submit" id='submit' value='Connexion' className="btn-bagad-heol"/>
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol-mdp mb-5">
          <Row>
            <Col>
              <Link to={"/register"} className="btn-bagad-heol-mdp">
                Mot de passe oublié ?
              </Link>
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol">
          <Row>
            <Col>
              <h3>Pas encore de compte ?</h3>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Link to={"/register"} className="btn-bagad-heol">
                S'inscrire
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

Login.propTypes = {};
Login.defaultProps = {};

export default Login;