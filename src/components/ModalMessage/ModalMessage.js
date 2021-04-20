import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import { Check, Exclamation } from 'react-bootstrap-icons';
import logo from '../../logo.svg';
import * as messageActions from '../../redux/message/actions';

function ModalMessage(props) {
  const message = useSelector(state => state.message);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(props.show !== null && props.show !== undefined ? props.show : false);
  }, [setShow]);

  const closeMessage = () => {
    setShow(false);
    dispatch(messageActions.setMessage(null));
    // console.log('test');
  }

  const Icon = () => {
    if (Array.isArray(message.message) && message.message.length > 1) {
      return ('');
    } else {
      if (message.message?.[0]?.status == 'error' || [400, 401, 403, 500].includes(message.message?.[0]?.status)) {
        return (
          <div className="alert-exclamation-container">
            <Exclamation />
          </div>
        )
      } else {
        return (
          <div className="alert-check-container">
            <Check />
          </div>
        )
      }
    }
  }

  const Title = () => {
    if (Array.isArray(message.message) && message.message.length > 1) {
      return ('Merci de faire attention aux messages suivants');
    } else {
      if (message.message?.[0]?.status == 'error' || [400, 401, 403, 500].includes(message.message?.[0]?.status)) {
        return ('Une erreur est survenue');
      } else {
        return ('Demande réalisé avec succès !');
      }
    }
  }

  const Body = () => {
    if (Array.isArray(message.message) && message.message.length > 1) {
      return (
        message.message.map((msg, i) => {
          return (<div className="flex mb-1"><BodyIcon msg={msg} />{msg.message}</div>) 
        })
      )
    } else {
      return (<p>{message.message?.[0]?.message}</p>);
    }
  }

  const BodyIcon = (props) => {
    if (props.msg?.status == 'error') {
      return (
        <div className="alert-exclamation-container-small">
          <Exclamation />
        </div>
      )
    } else {
      return (
        <div className="alert-check-container-small">
          <Check />
        </div>
      )
    }
  }

  return (
    <Modal show={show} onHide={() => closeMessage()}>
      <Modal.Header closeButton className="header-confirm-modal align-items-center">
        <Icon />
        <Modal.Title><Title /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Body />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={() => closeMessage()}>
          Fermer
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

ModalMessage.propTypes = {};
ModalMessage.defaultProps = {};

export default ModalMessage;
