import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useParams } from "react-router";



const TestAcknowledgeModal = (props) => {
  // In Progress

  const { id } = useParams();
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
        Your Evaluation is about to start please read & acknowledge the following terms.

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}

        <h4>1. The minimising of windows will lead to failing the test.</h4>
        <h4>2. You can’t undo your answer after submitting it.</h4>
        <h4>3. If you want to skip any question press next without clicking any options.</h4>

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
              <b>I Acknowledge  </b>
            </label>
          </div>
          <Button className="btn btn-success m-3" onClick={props.onHide} disabled={!isAcknowledged}>
            Start
          </Button>

          <Link className="btn btn-primary m-3" to={`../single-induction-view/${id}`}>
            Cancel
          </Link>

        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TestAcknowledgeModal;
