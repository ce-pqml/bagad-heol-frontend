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

export class AdminPodcast extends Component {
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
            <Tab eventKey="add" title="Ajouter">
              <Row className="mt-2 mb-2">
                <Col>
                  <Container>
                    <Row className="block-title pb-4">
                      <Col><h3 className="title-sec">Ajouter un épisode Bagad Heol</h3></Col>
                    </Row>
                    <Row>
                      <Form
                        onSubmit={(values) => this.submitCreateUser(values)}
                        // validate={(values) => this.validate(values)}
                        render={({ handleSubmit, submitting, pristine }) => (
                          <form className="w-100" onSubmit={handleSubmit}>
                            <Container>
                              <Row>
                                <Col md={2}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Bloqué ?</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="block" component={Input} type="checkbox" className="w-auto form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={10}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Titre</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="titre" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={12}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Description</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="description" component={TextArea} className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={12}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Lien (siteweb)</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="lien" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Auteur</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="auteur" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={12}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Image / Cover</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="cover">
                                    {props => (
                                      <div>
                                        <DropZone {...props.input} onChange={(file) => document.getElementById('img-avatar').src = file[0].preview} />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={12}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Gallerie d'images</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="gallery">
                                    {props => (
                                      <div>
                                        <DropZone {...props.input} onChange={(file) => document.getElementById('img-avatar').src = file[0].preview} />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Explicite ? (Langage grossier ?...)</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="explicit" component={Input} type="checkbox" className="w-auto form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={4}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Numéro saison</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="num_saison" component={Input} type="number" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={8}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Saison</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="saison" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={4}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Numéro episode</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="num_episode" component={Input} type="number" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={8}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Episode</label>
                                    <p className="option-desc m-0"></p>
                                  </div>
                                  <Field name="episode" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={12}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Chapitres</label>
                                    <p className="option-desc m-0">Fichier JSON répartissant votre épisode en chapitres (ex: https://github.com/Podcastindex-org/podcast-namespace/blob/main/chapters/example.json)</p>
                                  </div>
                                  <Field name="chapitre">
                                    {props => (
                                      <div>
                                        <DropZone {...props.input} />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={2}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Extrait</label>
                                    <p className="option-desc m-0">Début</p>
                                  </div>
                                  <Field name="extrait[0].start" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={2}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Durée</p>
                                  </div>
                                  <Field name="extrait[0].end" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={8}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Nom</p>
                                  </div>
                                  <Field name="extrait[0].nom" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Transcript</label>
                                    <p className="option-desc m-0">Retranscription écrite de votre épisode (URL)</p>
                                  </div>
                                  <Field name="transcript">
                                    {props => (
                                      <div>
                                        <DropZone {...props.input} />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Personne</label>
                                    <p className="option-desc m-0">Nom</p>
                                  </div>
                                  <Field name="personne[0].nom" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={3}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Role</p>
                                  </div>
                                  <Field name="personne[0].role" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={3}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Groupe</p>
                                  </div>
                                  <Field name="personne[0].groupe" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={3}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Image</p>
                                  </div>
                                  <Field name="personne[0].image">
                                    {props => (
                                      <div>
                                        <DropZone {...props.input} />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={3}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Lien (url)</p>
                                  </div>
                                  <Field name="personne[0].lien" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0">Localisation</label>
                                    <p className="option-desc m-0">Geo (uri) / Osm (openstreetmap code)</p>
                                  </div>
                                  <Field name="localisation.geo" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                                <Col md={6}>
                                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                                    <label className="m-0"></label>
                                    <p className="option-desc m-0">Nom</p>
                                  </div>
                                  <Field name="localisation.nom" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                  validate={composeValidators(required, noSpace)} />
                                </Col>
                              </Row>


                              <Row className="mt-2 mb-5 justify-content-end">
                                <Col md={6} className="d-flex justify-content-end">
                                  {/* <Button variant="success">Confirmer</Button> */}
                                  <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                                    Ajouter l'épisode
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
            <Tab eventKey="stats" title="Statistique">
              <p>En construction</p>
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
)(AdminPodcast);

