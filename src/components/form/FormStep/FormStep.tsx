import { FC } from 'react';
import './FormStep.css';

interface FormStepProps {
  currentIndex: number;
  steps: string[];
}

const FormStep: FC<FormStepProps> = ({ currentIndex, steps }) => {

  return (
    <div className="form-steps-container">
      {steps.map((step, index) => (
        <div key={index} className="form-step">
          <div className={`form-step-number ${currentIndex === index ? "selected" : ""}`}>
            {index + 1}
          </div>
          <div className="form-step-text">
            <div className="form-step-text-heading">STEP {index + 1}</div>
            <div className="form-step-text-subheading">{step.toUpperCase()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormStep;