import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class AskResetPassword extends Component{
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render(){
    return(
      <Container className="reset-password bg-bagad-heol" fluid>
        <Container className="mb-5">
          <Row>
            <Col className="text-center">
              <Image src={logo} roundedCircle className="block-bagad-heol" />
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol">
          <Row>
            <Col>
              <h3>Mot de passe oublié</h3>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Email</label>
              <input type="text" placeholder="Email du compte perdu" name="lost-password" className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex justify-content-end">
              <input type="submit" id='submit' value='Réinitialiser mot de passe' className="btn-bagad-heol"/>
            </Col>
          </Row>
        </Container>
      </Container>
      // <div className="reset-password">
      //   <div className="screen-1">
      //     <body id="body">
      //     <img id="logo_bagad" src={logo} alt="Bagad_Heol"/>
      //     <div id="container">
      //       <h1>Mot de passe Oublié</h1>
      //       <label><b>Email*</b></label>
      //       <input type="text" placeholder="Entrer un mot de passe" name="password" required/>
      //       <input type="submit" id='submit_reset' value="Réinitialiser mot de passe"/>
      //     </div>
      //     </body>
      //   </div>
      // </div>
    );
  }
}

AskResetPassword.propTypes = {};
AskResetPassword.defaultProps = {};

export default AskResetPassword;