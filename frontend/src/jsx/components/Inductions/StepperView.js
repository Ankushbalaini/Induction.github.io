import React from 'react'
import { useState } from 'react';
import { TiTick } from "react-icons/ti";
import { Button } from 'react-bootstrap';

const StepperView = () => {

  const steps = ['Induction-posh', 'Induction-work', 'Induction-office']
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <div>
      <div>
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <Button
          className="btn btn-group"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </Button>
      )}
    </div>
  )
}

export default StepperView

