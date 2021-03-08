import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/user/actions';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input, Select, TextArea } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class ResetPassword extends Component{
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.changePassword(values);
  }

  validate(values) {
    const errors = {}
    if (values['new-password'] !== values['new-password-confirm']) {
      errors['new-password-confirm'] = 'Doit être similaire'
    }
    return errors
  }

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
        <Form
          onSubmit={(values) => this.submitForm(values)}
          validate={(values) => this.validate(values)}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col>
                    <h3 className="title-sec">Mot de passe oublié</h3>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Nouveau mot de passe</label>
                    {/* <input type="text" placeholder="Entrer le nom d'utilisateur" name="new-password" className="w-100 form-control form-control-sm" required /> */}
                    <Field name="new-password" component={Input} type="password" placeholder="Nouveau mot de passe" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Confirmer votre mot de passe</label>
                    {/* <input type="password" placeholder="Entrer le mot de passe" name="new-password-confirm" className="w-100 form-control form-control-sm" required /> */}
                    <Field name="new-password-confirm" component={Input} type="password" placeholder="Confirmer le nouveau mot de passe" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="d-flex justify-content-end">
                    <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                      Réinitialiser mot de passe
                    </button>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);