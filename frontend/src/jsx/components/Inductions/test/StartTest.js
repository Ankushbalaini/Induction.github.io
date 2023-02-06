import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundModal from "../../Modals/test/BackgroundModal";
import Modal from "react-bootstrap/Modal";
import TestAcknowledgeModal from "../../Modals/test/TestAcknowledgeModal";
import TestQuestions from "../../Modals/test/TestQuestions";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const StartTest = () => {
  const token = useSelector((state) => state.auth.auth.token);
  const [isAcknowledgementModalOpen, setIsAcknowledgementModalOpen] =
    useState(true);
  const [isQuesScreen, setIsQuesScreen] = useState(false);
  const [testFinished, setTestFinised] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [startTest, setStartTest] = useState(false);

  const { id } = useParams();

  // get Questions
  const getQuestions = async () => {
    const response = await fetch("http://localhost:8081/api/mcq/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setQuestions(response.data);
    } else {
      setQuestions(response.message);
    }
  };

  var elem = document.getElementById("root");
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const startTestApi = async () => {
    const response = await fetch("http://localhost:8081/api/mcq/start/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());

    if ("status" in response && response.status == true) {
      setStartTest(true);
      openFullscreen();
    }
  };

  // handle start test
  const handleStartClick = () => {
    getQuestions();

    setIsAcknowledgementModalOpen(false);
    setIsQuesScreen(true);
    startTestApi();

  };

  useEffect(() => {}, [questions]);

  // In progress
  return (
    <>
      <TestAcknowledgeModal
        show={isAcknowledgementModalOpen}
        startClick={handleStartClick}
      />

      {questions ? (
        <TestQuestions show={isQuesScreen} Questions={questions} />
      ) : (
        <h1>
          <i className="fas fa-atom fa-spin"></i>{" "}
        </h1>
      )}
    </>
  );
};

export default StartTest;
