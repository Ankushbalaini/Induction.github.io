import React from "react";
import './quiz.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TestQuestions = (props) => {

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const buttonsty = {
    float:"right",
    margin:"auto"
  }

  // const { questions } = quiz
  // const { question, choices, correctAnswer } = questions[activeQuestion];
  // correctAnswer

  const questions = props.Questions;
  
  const { question } = questions[activeQuestion];
  let choices = [questions[activeQuestion].option1, questions[activeQuestion].option2,questions[activeQuestion].option3,questions[activeQuestion].option4];
  let correctAnswer = questions[activeQuestion].answer;

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  useEffect(()=>{

  },[showResult]);

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="background-modal">
     {props.children}

 
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

          { (showResult) ? 
            <>
            <h3>My Score : {result.score}</h3>
            <h3>Correct : {result.correctAnswers}</h3>
            <h3>Wrong : {result.wrongAnswers}</h3>

            <div className="mb-3 row">
              <div className="col-sm-12">
                  <Link to="/courses" > Back to Inductions</Link>
                </div>
            </div>
            
            </>

            :


          <div className="basic-form">

          
              <h3>{questions[activeQuestion].question}</h3>
              <ul>
                
               {choices.map((answer, index) => (
                <li  
                onClick={() => onAnswerSelected(answer, index)}
                 key={answer}onAnswerSelected
                 className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                 {answer}
             </li>
              ))} 
                  
            </ul>
            
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <button 
                  type="submit" onClick={onClickNext} className="btn btn-success" style={buttonsty}>
                    Next
                  </button>
                  </div>
              </div>
              
           
          </div>
          }


        </div>

       

      </div>
    </div>
  );
};

export default TestQuestions;
