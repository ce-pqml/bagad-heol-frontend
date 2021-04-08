import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/user/actions';

import { Container, Row, Col, Form as BootstrapForm, Button, Image, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input, Select, TextArea, File } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';

import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import DropZone from '../../components/Form/DropZone';

export class AdminGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {confirmDelete: false};

    this.props.actions.getProfil()
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    // await this.props.actions.updateUser(values);
    console.log(values)
  }

  async submitCreateUser(values) {
    // await this.props.actions.updateUser(values);
    console.log(values)
  }

  async submitBanUser(values) {
    // await this.props.actions.updateUser(values);
    console.log(values)
  }

  validate(values) {
    const errors = {}
    if (values['new-password'] && !values['new-password-confirm']) {
      errors['new-password-confirm'] = 'Requis'
    }
    if (!values['new-password'] && values['new-password-confirm']) {
      errors['new-password'] = 'Requis'
    }
    if (values['new-password'] && values['new-password-confirm'] && values['new-password'] !== values['new-password-confirm']) {
      errors['new-password-confirm'] = 'Doit être similaire'
    }
    return errors
  }

  render() {
    let { profil } = this.props.user;

    return (
      <div className="bg-bagad-heol">
        <Container className="espace-membre">
          <Row className="mb-5">
            <Col>
              <Container>
                <Row className="pb-4">
                  <Col>
                    <div className="title-border-gradient mb-5">
                      <h1 className="title-gradient">Admin - Général</h1>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
            <Tab eventKey="general" title="General">
              
            </Tab>
            <Tab eventKey="utilisateur" title="Utilisateur">
              <Row className="mt-2 mb-2">
                <Col>
                  <Container>
                    <Row className="block-title pb-4">
                      <Col><h3 className="title-sec">Ajouter un utilisateur</h3></Col>
                    </Row>
                    <Row>
                      <Form
                        onSubmit={(values) => this.submitCreateUser(values)}
                        // validate={(values) => this.validate(values)}
                        render={({ handleSubmit, submitting, pristine }) => (
                          <form className="w-100" onSubmit={handleSubmit}>
                            <Container>
                              <Row>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Email</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Mot de passe</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                                  <Field name="password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(noSpace)} />
                                </Col>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Confirmer le mot de passe</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                                  <Field name="password-confirm" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-2 mb-5 justify-content-end">
                                <Col md={6} className="d-flex justify-content-end">
                                  {/* <Button variant="success">Confirmer</Button> */}
                                  <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                                    Ajouter l'utilisateur
                                  </button>
                                </Col>
                              </Row>
                            </Container>
                          </form>
                        )}
                      />
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row className="mt-5 mb-2">
                <Col>
                  <Container>
                    <Row className="block-title pb-4">
                      <Col><h3 className="title-sec">Bannir un utilisateur</h3></Col>
                    </Row>
                    <Row>
                      <Form
                        onSubmit={(values) => this.submitBanUser(values)}
                        // validate={(values) => this.validate(values)}
                        render={({ handleSubmit, submitting, pristine }) => (
                          <form className="w-100" onSubmit={handleSubmit}>
                            <Container>
                              <Row>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Email</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                                  <Field name="password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Motif</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                                  <Field name="new-password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(noSpace)} />
                                </Col>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Durée</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                                  <Field name="new-password-confirm" component={Input} type="password" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-2 mb-5 justify-content-end">
                                <Col md={6} className="d-flex justify-content-end">
                                  {/* <Button variant="success">Confirmer</Button> */}
                                  <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                                    Bannir l'utilisateur
                                  </button>
                                </Col>
                              </Row>
                            </Container>
                          </form>
                        )}
                      />
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="forum" title="Forum">
              <p>contact</p>
            </Tab>
          </Tabs>
        </Container>
        {/* {this.state.confirmDelete && */}
          <ModalConfirmation
            show={this.state.confirmDelete}
            closeAction={() => this.setState(prevstate => ({ ...prevstate, confirmDelete: false}))}
            confirmAction={() => this.setState(prevstate => ({ ...prevstate, confirmDelete: false}))}
            title={"Confirmation suppression compte"}
            msg={"Êtes-vous sûr de vouloir supprimer votre compte ?<br/> Vous n'aurez plus accès à notre fantastique communauté ! Au partage, à l'échange..."}
          />
        {/* } */}
      </div>
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
)(AdminGeneral);

