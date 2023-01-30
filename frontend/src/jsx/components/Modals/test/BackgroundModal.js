import React from "react";
import './quiz.css';
import { useState } from "react";


const BackgroundModal = (props) => {

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })


  const quiz = {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question:
          'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'stringify()',
      },
      {
        question:
          'Which of the following keywords is used to define a variable in Javascript?',
        choices: ['var', 'let', 'var and let', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'var and let',
      },
      {
        question:
          'Which of the following methods can be used to display data in some form using Javascript?',
        choices: [
          'document.write()',
          'console.log()',
          'window.alert',
          'All of the above',
        ],
        type: 'MCQs',
        correctAnswer: 'All of the above',
      },
      {
        question: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'constant'],
        type: 'MCQs',
        correctAnswer: 'const',
      },
    ],
  }



  const buttonsty = {
    float:"right",
    margin:"auto"
  }

  const { questions } = quiz
  const { question, choices, correctAnswer } = questions[activeQuestion]


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
          <div className="basic-form">
          
              <h3>{questions[activeQuestion].question}</h3>
              <ul>
               {choices.map((answer, index) => (
                <li  
                onClick={() => onAnswerSelected(answer, index)}
                 key={answer}
                 className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                 {answer}
             </li>
              ))}
            </ul>
            
              <div className="mb-3 row">
                <div className="col-sm-12">
                  <button 
                  onClick={onClickNext}
                  type="submit" className="btn btn-success" style={buttonsty}>
                    Next
                  </button>
                  </div>
              </div>
              
           
          </div>
        </div>

       

      </div>
    </div>
  );
};

export default BackgroundModal;
