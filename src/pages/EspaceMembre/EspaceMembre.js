import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/user/actions';

import { Container, Row, Col, Form as BootstrapForm, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Input, Select, TextArea } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';

import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';

export class EspaceMembre extends Component {
  constructor(props) {
    super(props);
    this.state = {confirmDelete: false};
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    await this.props.actions.updateUser(values);
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
    let { currentUser } = this.props.user;

    return (
      <div className="bg-bagad-heol">
        <Container className="espace-membre">
          <Form
            initialValues={currentUser}
            onSubmit={(values) => this.submitForm(values)}
            validate={(values) => this.validate(values)}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Row className="mb-5">
                  <Col>
                    <Container>
                      <Row className="pb-4">
                        <Col>
                          <div className="title-border-gradient mb-5">
                            <h1 className="title-gradient">Espace Membre</h1>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Container>
                          <Row>
                            <Col md={6}>
                              <div className="d-flex justify-content-between align-items-end flex-wrap">
                                <label className="m-0">Pseudonyme</label>
                                <p className="option-desc m-0">Affiché sur le forum, commentaire, en public</p>
                              </div>
                              {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                              <Field name="pseudonyme" component={Input} type="text" className="w-100 form-control form-control-sm" 
                              validate={composeValidators(required, noSpace)} />
                            </Col>
                            <Col md={6}>
                              <div className="d-flex justify-content-between align-items-end flex-wrap">
                                <label className="m-0">E-mail</label>
                                <p className="option-desc m-0">Pour les notifications, contact</p>
                              </div>
                              {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                              <Field name="email" component={Input} type="text" className="w-100 form-control form-control-sm" 
                              validate={composeValidators(required, noSpace, email)} />
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Container>
                      <Row className="block-title pb-4">
                        <Col><h3 className="title-sec">Sécurité</h3></Col>
                      </Row>
                      <Row>
                        <Container>
                          <Row>
                            <Col md={6}>
                              <div className="d-flex justify-content-between align-items-end flex-wrap">
                                <label className="m-0">Mot de passe</label>
                                <p className="option-desc m-0">Avant toute modification, entrez votre mot de passe actuel</p>
                              </div>
                              {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                              <Field name="password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                              validate={composeValidators(required, noSpace)} />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="d-flex justify-content-between align-items-end flex-wrap">
                                <label className="m-0">Nouveau mot de passe</label>
                                <p className="option-desc m-0"></p>
                              </div>
                              {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                              <Field name="new-password" component={Input} type="password" className="w-100 form-control form-control-sm" 
                              validate={composeValidators(noSpace)} />
                            </Col>
                            <Col md={6}>
                              <div className="d-flex justify-content-between align-items-end flex-wrap">
                                <label className="m-0">Confirmer le nouveau mot de passe</label>
                                <p className="option-desc m-0"></p>
                              </div>
                              {/* <input type="text" className="w-100 form-control form-control-sm" /> */}
                              <Field name="new-password-confirm" component={Input} type="password" className="w-100 form-control form-control-sm" 
                              validate={composeValidators(noSpace)} />
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className="mb-5 justify-content-end">
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="danger" className="mr-3" 
                    onClick={(e) => this.setState(prevstate => ({ ...prevstate, confirmDelete: true}))}>Supprimer mon compte</Button>
                    {/* <Button variant="success">Confirmer</Button> */}
                    <button type="submit" className="btn-bagad-heol mr-3" disabled={submitting || pristine}>
                      Mettre à jour
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
          <Row className="mb-5">
            <Col>
              <Container>
                <Row className="block-title pb-4">
                  <Col><h3 className="title-sec">Notifications</h3></Col>
                </Row>
                <Row>
                  <Container>
                    <Row>
                      <Col>
                        <h4>Podcast</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Nouveau podcast</label>
                          <p className="option-desc m-0">Si un nouveau podcast sort</p>
                        </div>
                        <BootstrapForm.Check 
                          type="switch"
                          id="podcast_new"
                          className="switch-notif"
                        />
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Nouvel épisode</label>
                          <p className="option-desc m-0">Si un nouvel épisode de podcast sort</p>
                        </div>
                        <BootstrapForm.Check 
                          type="switch"
                          id="podcast_new_episode"
                          className="switch-notif"
                        />
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <Col>
                        <h4>Forum</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Réponse à mon post</label>
                          <p className="option-desc m-0">Quand quelqu'un répond à mon post forum</p>
                        </div>
                        <BootstrapForm.Check 
                          type="switch"
                          id="forum_post_response"
                          className="switch-notif"
                        />
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Réponse à mon commentaire</label>
                          <p className="option-desc m-0">Si quelqu'un répond à mon commentaire</p>
                        </div>
                        <BootstrapForm.Check 
                          type="switch"
                          id="forum_com_response"
                          className="switch-notif"
                        />
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <Col>
                        <h4>Newslette</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                          <label className="m-0">Reception newsletter</label>
                          <p className="option-desc m-0">Recevoir les newsletters</p>
                        </div>
                        <BootstrapForm.Check 
                          type="switch"
                          id="newsletter"
                          className="switch-notif"
                        />
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </Container>
            </Col>
          </Row>
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
)(EspaceMembre);

