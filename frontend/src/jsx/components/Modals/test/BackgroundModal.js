import React from "react";
import './quiz.css';
import { useState } from "react";


const BackgroundModal = (props) => {

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

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

  // destructuring
  const { question, choices, correctAnswer } = questions[activeQuestion]


  const onClickNext = () => {
    setActiveQuestion((prev) => prev + 1)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
  }

  

  return (
    <div className="background-modal">
     {props.children}

 
     <div className="quiz-container col-xl-6 col-lg-12 card">
      
        <div className="card-header">
          <h4 className="card-title">Start The Quiz!</h4>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Question no 1</label>
                <div className="col-sm-9">
                 <h3>  Which function is used to serialize an object into a JSON string in Javascript?</h3>
                </div>
              </div>
              <fieldset className="form-group">
                <div className="row mb-3">
                  <label className="col-form-label col-sm-2 pt-0">
                    Choices
                  </label>
                  <div className="col-sm-9">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option1"
                        defaultChecked
                      />
                      <label className="form-check-label">
                       stringify()
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option2"
                      />
                      <label className="form-check-label">
                       parse()
                      </label>
                    </div>
                    <div className="form-check ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option3"
                      />
                      <label className="form-check-label">
                      convert()
                      </label>
                    </div>
                    
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option1"
                        defaultChecked
                      />
                      <label className="form-check-label">
                      None of the above
                      </label>
                    </div>
                  </div>
                </div>
                
                
              </fieldset>
              <h2>{questions[activeQuestion].question}</h2>
              <ul className="liststyle">
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
                <div className="col-sm-11">
                  <button onClick={onClickNext} type="submit" className="btn btn-success" style={buttonsty}>
                    Next
                  </button>

                
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  

      
    

  

    </div>
  );
};

export default BackgroundModal;
