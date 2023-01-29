import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundModal from "../../Modals/test/BackgroundModal";
import Modal from "react-bootstrap/Modal";
import TestAcknowledgeModal from "../../Modals/test/TestAcknowledgeModal";

const StartTest = () => {
  const [isAcknowledgementModalOpen, setIsAcknowledgementModalOpen] = useState(true);
  // In progress
  return (
    <BackgroundModal>
      {/* <Link to="/start-test">Close</Link> */}
      <TestAcknowledgeModal
        show={isAcknowledgementModalOpen}
        onHide={() => setIsAcknowledgementModalOpen(false)}
      />
    </BackgroundModal>
  );
};

export default StartTest;
