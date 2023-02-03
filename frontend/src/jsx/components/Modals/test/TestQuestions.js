import React from "react";
import "./quiz.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bjslogo from "./../../../../../src/images/bg-1.jpg";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const TestQuestions = (props) => {
  const navigate = useHistory();
  const userID = useSelector((state) => state.auth.auth._id);
  const token = useSelector((state) => state.auth.auth.token);
  const { id } = useParams();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [submitTest, setSubmitTest] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [tabChangeCount , setTabChangeCount] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const buttonsty = {
    float: "right",
    margin: "auto",
  };

  const submitTestApi = async (id, token, dataPass) => {
    return await fetch("http://localhost:8081/api/mcq/submit/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(dataPass),
    }).then((data) => data.json());
  
    
  };



  
  // setting questions 
  const questions = props.Questions;

  const { question } = questions[activeQuestion];
  let choices = [
    questions[activeQuestion].option1,
    questions[activeQuestion].option2,
    questions[activeQuestion].option3,
    questions[activeQuestion].option4,
  ];
  let correctAnswer = questions[activeQuestion].answer;

  const onClickNext = async () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setSubmitTest(true);
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  }

  useEffect(async () => {
    if(showResult){
      var data = { ...result};
      const response = await submitTestApi(id, token, data);
      if ("status" in response && response.status == true) {
      }else{

      }
    }

  }, [showResult, result]);

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);


  // change tab 3 times in browser leads to fail test
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        // console.log('has focus');
    } else {

      if(tabChangeCount > 2){
        swal({
          title: "Test Fail.",
          text:
            "You are switching tabs more that 3 times in test.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {

          if (willDelete) {
            swal("Test Fail. and redirecting you to inductions", {
              icon: "warning",
            }).then(()=>{
              navigate.push("/inductions");
            });
          }

          
        })
      }else{
        setTabChangeCount(tabChangeCount+1);
      }

      
      
    }
  });




  return (
    <div className="background-modal" style={{
      backgroundImage: "url(" + bjslogo + ")",
      backgroundSize: "cover",
    }}
  >

      {props.children}

      {showResult ? (
        <>
          
          <div className="quiz-container text-justify display-6">
            <h3>My Score : {result.score}</h3>
            <h3>Correct : {result.correctAnswers}</h3>
            <h3>Wrong : {result.wrongAnswers}</h3>
            
            <h3>
              Thanks For Attempting the test your test results will be shared
              with you shortly!
            </h3>

            <div className="mb-3 row text-justify">
              <div className="col-sm-12 text-center">
                {/* onClick={exitFullscreen} */}
                <Link to="/inductions" className="text-justify" onClick={exitFullscreen}>
                  {" "}
                  Click Here to exit.{" "}
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-container ">
          <div className="card-header">
            <h4 className="card-title">Start The Quiz!</h4>
          </div>
          <span className="active-question-no">
            {addLeadingZero(activeQuestion + 1)}
          </span>
          <span className="total-question">
            /{addLeadingZero(questions.length)}
          </span>

          <div className="card-body">
            <div className="basic-form">
              <h3>{questions[activeQuestion].question}</h3>
              <ul>
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    onAnswerSelected
                    className={
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }
                  >
                    {answer}
                  </li>
                ))}
              </ul>

              <div className="mb-3 row">
                <div className="col-sm-12 mt-3">
                  <button
                    type="submit"
                    onClick={onClickNext}
                    className="btn btn-success"
                    style={buttonsty}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestQuestions;
