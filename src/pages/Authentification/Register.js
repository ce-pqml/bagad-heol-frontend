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
import ModalMessage from '../../components/ModalMessage/ModalMessage';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Register extends Component{
  static propTypes = {
    authentification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async componentWillMount() {
    // await this.props.actions.captcha();
  }

  async submitForm(values) {
    await this.props.actions.createUser(values);
  }

  validate(values) {
    const errors = {}
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Doit être similaire'
    }
    if (values.email !== values.confirmEmail) {
      errors.confirmEmail = 'Doit être similaire'
    }
    return errors
  }

  render(){
    const { message } = this.props.message;
    return(
      <Container className="register bg-bagad-heol p-4" fluid>
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
          initialValues={{
            pseudo: "test",
            email: "test@local.fr",
            confirmEmail: "test@local.fr",
            password: "test",
            confirmPassword: "test",
            country: "test",
            question: "test",
            response: "test",
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container>
                <Row className="mb-4">
                  <Col>
                    <label className="m-0">Identifiant</label>
                    {/* <input type="text" placeholder="Entrer un nom d'utilisateur" name="username" className="w-100 form-control form-control-sm" required /> */}
                    <Field name="pseudo" component={Input} type="text" placeholder="Entrer un nom d'utilisateur" className="w-100 form-control form-control-sm" 
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label className="m-0">Email</label>
                    {/* <input type="text" placeholder="Entrer votre email" name="email"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="email" component={Input} type="text" placeholder="Entrer votre email" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace, email)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <label className="m-0">Vérification de l'email</label>
                    {/* <input type="text" placeholder="Confirmer votre email" name="email-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="confirmEmail" component={Input} type="text" placeholder="Confirmer votre email" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace, email)} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label className="m-0">Mot de passe</label>
                    {/* <input type="password" placeholder="Entrer le mot de passe" name="password"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="password" component={Input} type="password" placeholder="Entrer le mot de passe" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <label className="m-0">Vérification du mot de passe</label>
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="confirmPassword" component={Input} type="password" placeholder="Confirmer votre mot de passe" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required, noSpace)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <label className="m-0">Pays</label>
                    <p className="option-desc m-0">Seulement pour faire des statistiques</p>
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="country" component={Input} type="text" placeholder="Entrer votre pays" className="w-100 form-control form-control-sm"
                    validate={composeValidators()} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <div className="d-flex justify-content-between align-items-end flex-wrap">
                      <label className="m-0">Question</label>
                      <p className="option-desc m-0">Si vous perdez votre mot de passe</p>
                    </div>
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="question" component={Input} type="text" placeholder="Une question que seul vous pourrez répondre" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <div className="d-flex justify-content-between align-items-end flex-wrap">
                      <label className="m-0">Réponse</label>
                      <p className="option-desc m-0">Réponse à votre question</p>
                    </div>
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="response" component={Input} type="text" placeholder="Une réponse que seul vous sauriez" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required)} />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={1}>
                    {/* <div className="d-flex justify-content-between align-items-end flex-wrap">
                      <label className="m-0">Réponse</label>
                      <p className="option-desc m-0">Réponse à votre question</p>
                    </div> */}
                    {/* <input type="password" placeholder="Confirmer votre mot de passe" name="password-confirm"  className="w-100 form-control form-control-sm" required /> */}
                    <Field name="check" component={Input} type="checkbox" className="w-100 form-control form-control-sm"
                    validate={composeValidators(required)} />
                  </Col>
                  <Col>
                    <p>En cochant cette case, vous acceptez que les informations entrées soit utilisés, conservé exclusivement sur le site Bagad-Heol. Elles ne seront en aucun cas vendu, donner, distribuer à d'autres tiers.</p>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col className="d-flex justify-content-between">
                    <div className="d-flex">
                      {/* {this.props.authentification.captcha && <img src={`data:image/png;base64,${unescape(encodeURIComponent(this.props.authentification.captcha))}`} alt="" />} */
                      // <img src={`data:image/png;base64,${btoa(unescape(encodeURIComponent(this.props.authentification.captcha)))}`} width="100px" height="50px" alt="" />
                      // <img src={`data:image/png;base64,${window.btoa(encodeURIComponent(this.props.authentification.captcha))}`} width="100px" height="50px" alt="" />
                      <img src="/auths.php" className="mr-2" width="100px" alt="" />
                      }
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
                      Créer un compte
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Link to={"/login"} className="btn-bagad-heol-mdp">
                      J'ai déjà un compte !
                    </Link>
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
    authentification: state.authentification,
    user: state.user,
    message: state.message,
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