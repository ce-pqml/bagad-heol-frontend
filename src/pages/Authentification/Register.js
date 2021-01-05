import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../redux/authentification/actions';
import * as userActions from '../../redux/user/actions';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Register extends Component{
  static propTypes = {
    authentification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.createUser(values);
  }

  validate(values) {
    const errors = {}
    if (values.password !== values['password-confirm']) {
      errors['password-confirm'] = 'Doit être similaire'
    }
    if (values.email !== values['email-confirm']) {
      errors['email-confirm'] = 'Doit être similaire'
    }
    return errors
  }

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
        <Form
          onSubmit={(values) => this.submitForm(values)}
          validate={(values) => this.validate(values)}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container className="block-bagad-heol">
                <Row className="mb-4">
                  <Col>
                    <label>Identifiant</label>
                    {/* <input type="text" placeholder="Entrer un nom d'utilisateur" name="username" className="w-100 form-control form-control-sm" required /> */}
                    <Field name="username" component={Input} type="text" placeholder="Entrer un nom d'utilisateur" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Email</label>
                    {/* <input type="text" placeholder="Entrer votre email" name="email"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="email" component={Input} type="text" placeholder="Entrer votre email" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace, email)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <label>Vérification de l'email</label>
                    {/* <input type="text" placeholder="Confirmer votre email" name="email-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="email-confirm" component={Input} type="text" placeholder="Confirmer votre email" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace, email)} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Mot de passe</label>
                    {/* <input type="password" placeholder="Entrer le mot de passe" name="password"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="password" component={Input} type="password" placeholder="Entrer le mot de passe" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Vérification du mot de passe</label>
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="password-confirm" component={Input} type="password" placeholder="Confirmer votre mot de passe" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="d-flex justify-content-end">
                    <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                      Créer un compte
                    </button>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        />
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
    );
  }
}

function mapStateToProps(state) {
  return {
    authentification: state.authentification,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...userActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);