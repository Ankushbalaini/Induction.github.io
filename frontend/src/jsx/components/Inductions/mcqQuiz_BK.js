import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Mcq(props) {
 const [question,setQuestion]=useState();
 const [option1,setOption1]=useState();
 const [option2,setOption2]=useState();
 const [option3,setOption3]=useState();
 const [option4,setOption4]=useState();
 const [answer,setAnswer]=useState();
  

 

 let errorObj ={ question :'',option1 :'',option2:'',option3 :'',option4 :'',answer:''}
 const [errors, setErrors] = useState(errorObj);

 function onCreate(e){
  e.preventDefault();
  let error = false;

  const errorObj ={ ...errorObj};
  if (question === ''){
    errorObj.option1="question is required";
 }
  if (option1 === ''){
     errorObj.option1="Option 1 is required";
  }
  if (option2 === ''){
    errorObj.option2="Option 2 is required";
 }
 if (option3 === ''){
  errorObj.option3="Option 3 is required";
}
if (option4 === ''){
  errorObj.option4="Option 4 is required";
}
if (answer=== ''){
  errorObj.answer="Answer is required";
}
 setErrors(errorObj);
 if(error) return;
 }

 // api call
  async function AddMcq(formvalues){
    const question = formvalues.question;
    const option1 = formvalues.option1;
    const option2 = formvalues.option2;
    const option3 = formvalues.option3;
    const option4 = formvalues.option4;

    return fetch ("url......",{
      method:"POST",
      headers :{
        "Content-Type" : "application/json",
      }
    })

  }

  const formstyle = {
    float:"right"
  }

  return (
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Create a Quiz</h4>
          </div>
              <h4 className="card-title m-auto">Enter Question</h4>
            <div className="card-body">
              <div className="basic-form">
                <form >
                  <div className="form-group ">
                    <textarea
                      className="form-control"
                      rows="3"
                      id="comment"
                      name="question"
                      placeholder="Enter question ...."
                    ></textarea>
                    {errors.question && <div Style="color:red;font-weight:600">{errors.question}</div>}
                  </div>
                </form>
          </div>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group ">
                <h4 className="card-title mb-3">Enter your Choices</h4>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="option1"
                      className="form-control input-rounded"
                      placeholder="Option 1"
                    />
                  {errors.option1 && <div Style="color:red;font-weight:600">{errors.option1}</div>}

                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="option2"
                      className="form-control input-rounded"
                      placeholder="Option 2"
                    />
                  {errors.option2 && <div Style="color:red;font-weight:600">{errors.option2}</div>}

                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="option3"
                      className="form-control input-rounded"
                      placeholder="Option 3"
                    />
                     {errors.option3 && <div Style="color:red;font-weight:600">{errors.option3}</div>}

                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="option4"
                      className="form-control input-rounded"
                      placeholder="Option 4"
                    />
                    {errors.option4 && <div Style="color:red;font-weight:600">{errors.option4}</div>}

                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="answer "
                      className="form-control input-rounded"
                      placeholder="Correct Answer"
                    />
                  {errors.answer && <div Style="color:red;font-weight:600">{errors.question}</div>}

                  </div>
                </div>

                    <Button variant="primary" size="lg" style={formstyle}>
                    Create
                   </Button>{' '}
                
                
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>

       );
}
export default Mcq;

// display: flex;
// flex-direction: column;
// align-items: 
