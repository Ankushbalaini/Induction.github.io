import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundModal from "../../Modals/test/BackgroundModal";
import Modal from "react-bootstrap/Modal";
import TestAcknowledgeModal from "../../Modals/test/TestAcknowledgeModal";
import TestQuestions from "../../Modals/test/TestQuestions";


const StartTest = () => {
  const [isAcknowledgementModalOpen, setIsAcknowledgementModalOpen] = useState(true);
  
  // In progress
  return (
    <BackgroundModal>

      
      <TestAcknowledgeModal
        show={isAcknowledgementModalOpen}
        onHide={() => setIsAcknowledgementModalOpen(false)}
      />

      {
        (!isAcknowledgementModalOpen) ?
          <TestQuestions />

          : null
      }

    </BackgroundModal>
  );
};

export default StartTest;
