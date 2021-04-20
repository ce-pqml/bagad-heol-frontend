import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../redux/user/actions';
import * as adminActions from '../../redux/admin/actions';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { TextArea } from '../../components/Form/From';
import { required, composeValidators } from '../../helpers/validationForm';

import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';

export class AdminTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {confirmDelete: false};

    // console.log('test : '+this.props.match.params.id)
    this.props.actions.getProfil();
    this.props.actions.getTicketById(this.props.match.params.id);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async sendResponse(values) {
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
    const { profil } = this.props.user;
    const { ticket } = this.props.admin;

    const url_return = window.location.pathname.split('/')[1] == 'espace-membre' ? '/espace-membre' : '/admin/general'
    console.log(window.location.pathname.split('/')[1])

    return (
      <div className="bg-bagad-heol">
        <Container className="ticket-page">
          <Row>
            <Col>
              <Container>
                <Row className="pb-4">
                  <Col>
                    <div className="title-border-gradient mb-5">
                      <h1 className="title-gradient">Ticket</h1>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Container>
                <Row className="block-title pb-1">
                  <Col className='d-flex'>
                    <h3 className="title-sec w-100">Gestion du ticket # {this.props.match.params.id}</h3>
                    <Button className="btn-bagad-heol"
                      onClick={() => this.props.history.push(url_return)}>Retour</Button>
                  </Col>
                </Row>
                <Row>
                  <Col><p><span className="font-weight-bold">Titre : </span> {ticket.title}</p></Col>
                </Row>
                <Row className="pb-1">
                  <Col><p><span className="font-weight-bold">Type : </span> {ticket.type}</p></Col>
                  <Col><p><span className="font-weight-bold">Statut : </span> {ticket.status}</p></Col>
                </Row>
                <Row className="border-bottom mb-3">
                  
                </Row>
                {ticket.responses && Array.isArray(ticket.responses) && ticket.responses.map((response) => 
                  <Row className="mb-2">
                    <Col md={12} className={response.author == profil?.login ? "d-flex flex-column justify-content-end align-items-end" : ""}>
                      <div className={response.author == profil?.login ? "w-75 text-right ticket-response" : "w-75 ticket-response"}>
                        <span>{response.author}&nbsp;-&nbsp;</span>
                        <span>{response.date}</span>
                      </div>
                      <Container fluid className="w-75 border p-3 shadow-sm bg-white rounded m-0 ticket-response">
                        {response.text}
                      </Container>
                    </Col>
                  </Row>
                )}
                <Form
                  onSubmit={(values) => this.sendResponse(values)}
                  // validate={(values) => this.validate(values)}
                  render={({ handleSubmit, submitting, pristine }) => (
                    <form className="w-100" onSubmit={handleSubmit}>
                      <Row className="mt-5">
                        <Col>
                          <span>Votre réponse</span>
                          <Field name="response" component={TextArea} type="text" className="w-100 form-control form-control-sm" 
                            validate={composeValidators(required)} />
                        </Col>
                      </Row>
                      <Row className="mt-2 justify-content-end">
                        <Col md={6} className="d-flex justify-content-end">
                          <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                            Envoyer
                          </button>
                        </Col>
                      </Row>
                    </form>
                  )}
                />
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
    admin: state.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions, ...adminActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminTicket));

