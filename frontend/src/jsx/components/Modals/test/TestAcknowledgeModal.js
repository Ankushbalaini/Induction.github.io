import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TestAcknowledgeModal = (props) => {
  // In Progress
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Evaluation will start shortly
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>
          Please read and acknowledge T&C:-
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Start</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TestAcknowledgeModal;
