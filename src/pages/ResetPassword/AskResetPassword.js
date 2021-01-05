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

export class AskResetPassword extends Component{
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.forgotPassword(values);
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
          // validate={(values) => this.validate(values)}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container className="block-bagad-heol">
                <Row>
                  <Col>
                    <h3>Mot de passe oublié</h3>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Email</label>
                    <Field name="lost-password" component={Input} type="text" placeholder="Email du compte perdu" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace, email)} />
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
)(AskResetPassword);
