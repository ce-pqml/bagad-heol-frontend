import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as contactActions from '../../redux/contact/actions';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import SubmitLiquid from '../../components/Button/SubmitLiquid';
import { Input, Select, TextArea } from '../../components/Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import logo from '../../assets/img/logo_bagad_heol.jpg';

export class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async submitForm(values) {
    // await this.props.actions.createUser(values);
  }

  render() {
    return (
      <Container className="contact bg-bagad-heol" fluid>
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
        <Container>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <div className="title-border-gradient mb-5">
                <h1 className="title-gradient">Contact</h1>
              </div>
              <p>Si vous souhaitez nous contacter afin de nous proposer des idées, faire une demande de participation ou bien encore une réclamation, vous pouvez remplir ce formulaire.</p>
              <Form
                onSubmit={(values) => this.submitForm(values)}
                // validate={(values) => this.validate(values)}
                render={({ handleSubmit, submitting, pristine }) => (
                  <form className=" d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                    <Container className="block-bagad-heol">
                      <Row className="mb-3">
                        <Col>
                          <label>Prénom</label>
                          <Field name="firstname" component={Input} type="text" placeholder="" className="w-100 form-control form-control-sm" 
                          validate={composeValidators(required)} />
                        </Col>
                        <Col>
                          <label>Nom</label>
                          <Field name="lastname" component={Input} type="text" placeholder="" className="w-100 form-control form-control-sm" 
                          validate={composeValidators(required)} />
                        </Col>
                        <Col>
                          <label>Email</label>
                          <Field name="email" component={Input} type="text" placeholder="" className="w-100 form-control form-control-sm" 
                          validate={composeValidators(required, noSpace, email)} />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <label>Sujet</label>
                          <Field name="subject" component={Select} className="w-100 form-control form-control-sm" 
                          validate={composeValidators(required)}>
                            <option value="Proposition de concept" selected="selected">Proposition de concept</option>
                            <option value="Réclamation">Réclamation</option>
                            <option value="Demande d'ouverture de compte">Demande d'ouverture de compte</option>
                            <option value="Informations générales">Informations générales</option>
                            <option value="Autres">Autres</option>
                          </Field>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <label>Message</label>
                          <Field name="msg" component={TextArea} className="w-100 form-control form-control-sm text-area-bagad-heol" 
                          validate={composeValidators(required)} />
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center mb-3">
                        <Col md={1}>
                          <Field name="rgpd" component={Input} type="checkbox" className="w-100 form-control form-control-sm" 
                          validate={composeValidators(required)} />
                        </Col>
                        <Col>
                          <p className="m-0">En soumettant ce formulaire de contact, j'accepte que les informations saisies soient exploitées
                            dans le cadre de ma demande d'information.
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-end">
                          <SubmitLiquid text="Envoyer" disabled={submitting || pristine}/>
                          {/* <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                            Envoyer
                          </button> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-end">
                          <p>Pour connaître et exercer vos droits, notamment de retrait de votre consentement à l'utilisation des données collectées par ce formulaire,
                            veuillez consulter les conditions générales d'utilisation liées à la gestion des données personnelles.</p>
                        </Col>
                      </Row>
                    </Container>
                  </form>
                )}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contact,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators({ ...contactActions }, dispatch)
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
