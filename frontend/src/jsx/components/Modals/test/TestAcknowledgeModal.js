import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const TestAcknowledgeModal = (props) => {
  // In Progress
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Evaluation will start shortly
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>Please read and acknowledge T&C:-</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="acknowledgement-footer">
          <div className="acknowledgement-checkbox">
            <input
              type="checkbox"
              id="acknowledgement-checkbox"
              checked={isAcknowledged}
              onChange={() => setIsAcknowledged((prev) => !prev)}
            />
            <label
              style={{ marginBottom: "0px" }}
              htmlFor="acknowledgement-checkbox"
            >
              I Acknowledge
            </label>
          </div>
          <Button onClick={props.onHide} disabled={!isAcknowledged}>
            Agree
          </Button>
        
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TestAcknowledgeModal;
