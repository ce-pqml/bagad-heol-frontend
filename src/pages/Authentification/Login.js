import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../redux/authentification/actions';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import ModalMessage from '../../components/ModalMessage/ModalMessage';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Login extends Component{
  static propTypes = {
    authentification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.login(values);
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
      this.props.history.push("/");
    }
  }

  render(){
    const { message } = this.props.message;
    return(
      <Container className="login bg-bagad-heol" fluid>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Container className="mb-5">
          <Row>
            <Col className="text-center">
              <Image src={logo} roundedCircle className="block-bagad-heol" />
            </Col>
          </Row>
        </Container>
        <Form
          onSubmit={(values) => this.submitForm(values)}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container>
                <Row className="mb-3">
                  <Col>
                    <label>Identifiant</label>
                    {/* <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" className="w-100 form-control form-control-sm" required /> */}
                    <Field name="login" component={Input} type="text" placeholder="Entrer le nom d'utilisateur" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Mot de passe</label>
                    {/* <input type="password" placeholder="Entrer le mot de passe" name="password"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="password" component={Input} type="password" placeholder="Entrer le mot de passe" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col className="d-flex justify-content-end">
                    {/* <input type="submit" id='submit' value='Connexion' className="btn-bagad-heol"/> */}
                    <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                      Connexion
                    </button>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="d-flex justify-content-end">
                    <Link to={"/resetpassword"} className="btn-bagad-heol-mdp">
                      Mot de passe oublié ?
                    </Link>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        />
        <Container>
          <Row>
            <Col>
              <h3 className="title-sec">Pas encore de compte ?</h3>
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
        {message && Array.isArray(message) && message.length >= 1 && <ModalMessage show={true} />}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentification: state.authentification,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch)
  };
}



export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));