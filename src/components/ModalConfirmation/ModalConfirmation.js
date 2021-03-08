import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import { Exclamation } from 'react-bootstrap-icons';
import logo from '../../logo.svg';
import * as exampleActions from '../../redux/example/actions';

function ModalConfirmation(props) {
  // const examples = useSelector(state => state.examples);
  // const dispatch = useDispatch();

  // useEffect( () => {
  //   dispatch(exampleActions.fetchRedditList());
  // }, []);

  return (
    <Modal show={props.show} onHide={props.closeAction}>
      <Modal.Header closeButton className="header-confirm-modal align-items-center">
        <div className="alert-exclamation-container">
          <Exclamation />
        </div>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.msg}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeAction}>
          Annuler
        </Button>
        <Button variant="danger" onClick={props.confirmAction}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalConfirmation.propTypes = {};
ModalConfirmation.defaultProps = {};

export default ModalConfirmation;
