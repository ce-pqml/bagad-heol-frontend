import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import { Exclamation } from 'react-bootstrap-icons';
import logo from '../../logo.svg';
import * as exampleActions from '../../redux/example/actions';

function ModalError(props) {
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
        <Modal.Title>Une erreur est survenue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.msg}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeAction}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalError.propTypes = {};
ModalError.defaultProps = {};

export default ModalError;
