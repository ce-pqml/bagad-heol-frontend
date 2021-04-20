import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/user/actions';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input, Select, TextArea } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';
import ModalMessage from '../../components/ModalMessage/ModalMessage';

export class AskResetPassword extends Component{
  constructor(props) {
    super(props);

    if (localStorage.getItem('token') && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
      this.props.history.push("/");
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.forgotPassword(values);
    if (this.props.message?.message?.[0]?.type == "success") {
      this.props.history.push('/')
    }
  }

  render(){
    const { message } = this.props.message;

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
              <Container>
                <Row>
                  <Col>
                    <h3 className="title-sec">Mot de passe oublié</h3>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label>Email</label>
                    <Field name="email" component={Input} type="text" placeholder="Email du compte perdu" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace, email)} />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img src="/auths.php" className="mr-2" width="100px" alt="" />
                      <div>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Captcha</label>
                        </div>
                        {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                        <Field name="captcha" component={Input} type="text" placeholder="Répétez le captcha" className="w-100 form-control form-control-sm"
                        validate={composeValidators(required)} />
                      </div>
                    </div>
                    <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                      Réinitialiser mot de passe
                    </button>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        />
        {message && Array.isArray(message) && message.length >= 1 && <ModalMessage show={true} />}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AskResetPassword));
