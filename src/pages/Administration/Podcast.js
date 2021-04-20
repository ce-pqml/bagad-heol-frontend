import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as podcastActions from '../../redux/podcast/actions';

import { Container, Row, Col, Table, Tabs, Tab, Accordion, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Input, Select, TextArea, File } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import { decode } from 'html-entities';

import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import DropZone from '../../components/Form/DropZone';
import { Pencil } from 'react-bootstrap-icons';
import ModalMessage from '../../components/ModalMessage/ModalMessage';

export class AdminPodcast extends Component {
  constructor(props) {
    super(props);
    this.state = {confirmDelete: false};

    this.props.actions.getPodcastList()
  }

  static propTypes = {
    podcast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    const payload = new FormData();
    payload.append('audio', values.audio[0]);
    payload.append('cover', values.cover[0]);
    delete values.audio;
    delete values.cover;
    values.published ? values.published = 1 : values.published = 0
    values.explicit ? values.explicit = 1 : values.explicit = 0
    payload.append('request', JSON.stringify(values));
    await this.props.actions.addPodcast(payload);
    if (this.props.message?.message?.[0]?.status == 'success') {
      this.props.history.push('/admin/podcast')
    }
    console.log(values, payload)
  }

  render() {
    const { listPodcast } = this.props.podcast;
    const { message } = this.props.message;

    return (
      <div className="bg-bagad-heol">
        <Container className="espace-membre">
          <Row className="mb-5">
            <Col>
              <Container>
                <Row className="pb-4">
                  <Col>
                    <div className="title-border-gradient mb-5">
                      <h1 className="title-gradient">Admin - Podcast</h1>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
            <Tab eventKey="general" title="General">
            <Row className="mt-2 mb-2">
                <Col>
                  <Container>
                    <Row className="block-title pb-4">
                      <Col><h3 className="title-sec">Gestion des épisodes</h3></Col>
                    </Row>
                    <Row>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Saison</th>
                            <th>Episode</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listPodcast && Array.isArray(listPodcast) && listPodcast.map((podcast) => 
                            <tr>
                              <td>{podcast.id}</td>
                              <td>{decode(podcast.title)}</td>
                              <td>{decode(podcast.description).replace(/^(.{150}[^\s]*).*/, "$1...")}</td>
                              <td>{podcast.number_season}</td>
                              <td>{podcast.number_episode}</td>
                              <td>{podcast.publish_date}</td>
                              <td className="text-center">
                                <Link to={"/admin/podcast/"+podcast.id}><Pencil /></Link>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Row>
                  </Container>
                </Col>
              </Row>
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
                        onSubmit={(values) => this.submitForm(values)}
                        mutators={{
                          ...arrayMutators
                        }}
                        // validate={(values) => this.validate(values)}
                        render={({ 
                          handleSubmit,
                          submitting,
                          pristine,
                          form: {
                            mutators: { push, pop }
                          } 
                        }) => (
                          <form className="w-100" onSubmit={handleSubmit}>
                            <Container>
                              <Row>
                                <Col md={12}>
                                  <Accordion defaultActiveKey="0">
                                    <Card>
                                      <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Général
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                          <Container>
                                            <Row>
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Titre</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="title" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(required)} />
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Description</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="description" component={TextArea} className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(required)} />
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Lien (siteweb)</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="url" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(required, noSpace)} />
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={6}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Auteur</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="publish_author" component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(required)} />
                                              </Col>
                                              <Col md={2}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Publié ?</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="published" component={Input} type="checkbox" className="w-auto form-control form-control-sm" 
                                                validate={composeValidators(noSpace)} />
                                              </Col>
                                              <Col md={4}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Explicite ? (Langage grossier ?...)</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="explicit" component={Input} type="checkbox" className="w-auto form-control form-control-sm" 
                                                validate={composeValidators(noSpace)} />
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Fichier audio</label>
                                                  <p className="option-desc m-0">Fichier audio de votre podcast (.mp3)</p>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md={3}>
                                                <Field name="audio" validate={composeValidators(required)}>
                                                  {props => (
                                                    <div>
                                                      <DropZone {...props.input} {...props.meta} max={1} multiple={false} accept=".mp3" />
                                                    </div>
                                                  )}
                                                </Field>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                      <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Image
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                          <Container>
                                            <Row>
                                              <Col md={3}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Image / Cover</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="cover" validate={composeValidators(required)}>
                                                  {props => (
                                                    <div>
                                                      <DropZone {...props.input} {...props.meta} max={1} multiple={false} accept="image/*" />
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
                                                <Field name="images">
                                                  {props => (
                                                    <div>
                                                      <DropZone {...props.input} {...props.meta} max={10} multiple={true} accept="image/*" />
                                                    </div>
                                                  )}
                                                </Field>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                      <Accordion.Toggle as={Card.Header} eventKey="2">
                                        Saison / Episode
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                          <Container>
                                            <Row>
                                              <Col md={4}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Numéro saison</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="number_season" component={Input} type="number" className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(noSpace)} />
                                              </Col>
                                              <Col md={8}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Saison</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="title_season" component={Input} type="text" className="w-100 form-control form-control-sm"/>
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={4}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Numéro episode</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="number_episode" component={Input} type="number" className="w-100 form-control form-control-sm" 
                                                validate={composeValidators(noSpace)} />
                                              </Col>
                                              <Col md={8}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Episode</label>
                                                  <p className="option-desc m-0"></p>
                                                </div>
                                                <Field name="title_episode" component={Input} type="text" className="w-100 form-control form-control-sm"/>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                      <Accordion.Toggle as={Card.Header} eventKey="3">
                                        Participants
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                          <Container>
                                            <Row>
                                              <Col md={12}>
                                                <button
                                                  type="button"
                                                  className="btn-bagad-heol"
                                                  onClick={() => push('animators', undefined)}
                                                >
                                                  Ajouter un participant
                                                </button>
                                              </Col>
                                              <Col md={12}>
                                                <FieldArray name="animators">
                                                  {({ fields }) => fields.map((name, index) => (
                                                    <Container key={name}>
                                                      <Row className="mt-3">
                                                        <Col md={9}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">Personne {index+1}</label>
                                                            <p className="option-desc m-0">Nom</p>
                                                          </div>
                                                          <Field name={`${name}.name`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required)} />
                                                        </Col>
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">Supprimer</label>
                                                            <p className="option-desc m-0"></p>
                                                          </div>
                                                          <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{ cursor: 'pointer' }}
                                                          >
                                                            ❌
                                                          </span>
                                                        </Col>
                                                      </Row>
                                                      <Row className="mt-3">
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Role</p>
                                                          </div>
                                                          <Field name={`${name}.role`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required)} />
                                                        </Col>
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Groupe</p>
                                                          </div>
                                                          <Field name={`${name}.group`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required)} />
                                                        </Col>
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Image</p>
                                                          </div>
                                                          <Field name={`${name}.image`}>
                                                            {props => (
                                                              <div>
                                                                <DropZone {...props.input} {...props.meta} max={1} multiple={false} accept="image/*" />
                                                              </div>
                                                            )}
                                                          </Field>
                                                        </Col>
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Lien (url)</p>
                                                          </div>
                                                          <Field name={`${name}.website_url`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required)} />
                                                        </Col>
                                                      </Row>
                                                    </Container>
                                                    // <div key={name}>
                                                    //   <label>Cust. #{index + 1}</label>
                                                    //   <Field
                                                    //     name={`${name}.firstName`}
                                                    //     component="input"
                                                    //     placeholder="First Name"
                                                    //   />
                                                    //   <Field
                                                    //     name={`${name}.lastName`}
                                                    //     component="input"
                                                    //     placeholder="Last Name"
                                                    //   />
                                                    //   <span
                                                    //     onClick={() => fields.remove(index)}
                                                    //     style={{ cursor: 'pointer' }}
                                                    //   >
                                                    //     ❌
                                                    //   </span>
                                                    // </div>
                                                  ))}
                                                </FieldArray>
                                              </Col>
                                            </Row>
                                            
                                          </Container>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                      <Accordion.Toggle as={Card.Header} eventKey="4">
                                        Informations supplémentaires
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="4">
                                        <Card.Body>
                                          <Container>
                                            <Row>
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Chapitres</label>
                                                  <p className="option-desc m-0">Fichier JSON répartissant votre épisode en chapitres (ex: https://github.com/Podcastindex-org/podcast-namespace/blob/main/chapters/example.json)</p>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md={3}>
                                                <Field name="chapter_url_json">
                                                    {props => (
                                                      <div>
                                                        <DropZone {...props.input} {...props.meta} max={1} multiple={false} accept=".json" />
                                                      </div>
                                                    )}
                                                  </Field>
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={12}>
                                                <button
                                                  type="button"
                                                  className="btn-bagad-heol"
                                                  onClick={() => push('extract', undefined)}
                                                >
                                                  Ajouter un extrait
                                                </button>
                                              </Col>
                                              <Col md={12}>
                                                <FieldArray name="extract">
                                                  {({ fields }) => fields.map((name, index) => (
                                                    <Container key={name}>
                                                      <Row className="mt-3">
                                                        <Col md={2}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">Extrait</label>
                                                            <p className="option-desc m-0">Début</p>
                                                          </div>
                                                          <Field name={`${name}.time_start`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required, noSpace)} />
                                                        </Col>
                                                        <Col md={2}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Durée</p>
                                                          </div>
                                                          <Field name={`${name}.duration`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required, noSpace)} />
                                                        </Col>
                                                        <Col md={8}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">&nbsp;</label>
                                                            <p className="option-desc m-0">Nom</p>
                                                          </div>
                                                          <Field name={`${name}.description`} component={Input} type="text" className="w-100 form-control form-control-sm" 
                                                          validate={composeValidators(required)} />
                                                        </Col>
                                                        <Col md={3}>
                                                          <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                            <label className="m-0">Supprimer</label>
                                                            <p className="option-desc m-0"></p>
                                                          </div>
                                                          <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{ cursor: 'pointer' }}
                                                          >
                                                            ❌
                                                          </span>
                                                        </Col>
                                                      </Row>
                                                    </Container>
                                                  ))}
                                                </FieldArray>
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Transcript</label>
                                                  <p className="option-desc m-0">Retranscription écrite de votre épisode (.pdf)</p>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md={3}>
                                                <Field name="transcript">
                                                  {props => (
                                                    <div>
                                                      <DropZone {...props.input} {...props.meta} max={1} multiple={false} accept=".pdf" />
                                                    </div>
                                                  )}
                                                </Field>
                                              </Col>
                                            </Row>
                                            <Row className="mt-3">
                                              <Col md={6}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">Localisation</label>
                                                  <p className="option-desc m-0">Geo (uri) / Osm (openstreetmap code)</p>
                                                </div>
                                                <Field name="localisation" component={Input} type="text" className="w-100 form-control form-control-sm"/>
                                              </Col>
                                              <Col md={6}>
                                                <div className="d-flex justify-content-between align-items-end flex-wrap">
                                                  <label className="m-0">&nbsp;</label>
                                                  <p className="option-desc m-0">Nom</p>
                                                </div>
                                                <Field name="localisation_name" component={Input} type="text" className="w-100 form-control form-control-sm"/>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
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
        {message && Array.isArray(message) && message.length >= 1 && <ModalMessage show={true} />}
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
    podcast: state.podcast,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...podcastActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminPodcast));

