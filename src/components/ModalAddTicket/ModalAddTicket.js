import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import { Input, Select, TextArea, File } from '../Form/From';
import { required, noSpace, email, composeValidators } from '../../helpers/validationForm';
import { Exclamation } from 'react-bootstrap-icons';
import logo from '../../logo.svg';
import * as exampleActions from '../../redux/example/actions';
import * as supportActions from '../../redux/support/actions';

function ModalAddTicket(props) {
  const message = useSelector(state => state.message.message);
  const dispatch = useDispatch();

  // useEffect( () => {
  //   dispatch(exampleActions.fetchRedditList());
  // }, []);

  useEffect(() => {
    if (message?.[0]?.status == 'success') {
      props.closeAction()
    }
  });

  function createTicket(values) {
    // await this.props.actions.updateUser(values);
    dispatch(supportActions.addTicket(values))
    // console.log(values)
  }

  return (
    <Modal show={props.show} onHide={props.closeAction}>
      <Modal.Header closeButton className="header-add-ticket-modal align-items-center">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(values) => createTicket(values)}
        initialValues={{
          type: "compte"
        }}
        // validate={(values) => this.validate(values)}
        render={({ handleSubmit, submitting, pristine }) => (
          <form className="w-100" onSubmit={handleSubmit}>
            <Modal.Body>
              {props.msg}
              <Container fluid className="mt-3">
                <Row className="mb-2">
                  <Col md={2}>Sujet</Col>
                  <Col>
                    <Field name="title" component={Input} type="text" className="w-100 form-control form-control-sm" 
                        validate={composeValidators(required)} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={2}>Type</Col>
                  <Col>
                    <Field name="type" component={Select} className="w-100 form-control form-control-sm" 
                      validate={composeValidators(required)}>
                        <option value="compte">Compte</option>
                        <option value="podcast">Podcast</option>
                        <option value="site_web">Site internet / Lecteur audio</option>
                        <option value="autre">Autre</option>
                      </Field>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={2}>Message</Col>
                  <Col>
                    <Field name="text" component={TextArea} className="w-100 form-control form-control-sm" 
                      validate={composeValidators(required)} />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.closeAction}>
                Annuler
              </Button>
              <button type="submit" className="btn-bagad-heol" disabled={submitting || pristine}>
                Envoyer
              </button>
              {/* <Button variant="success" onClick={props.confirmAction}>
                Créer
              </Button> */}
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
}

ModalAddTicket.propTypes = {};
ModalAddTicket.defaultProps = {};

export default ModalAddTicket;
