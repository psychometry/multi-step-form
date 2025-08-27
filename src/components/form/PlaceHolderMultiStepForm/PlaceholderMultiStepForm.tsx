import React from "react";
import "./PlaceholderMultiStepForm.css";

const PlaceholderMultiStepForm: React.FC = () => {
  const steps = [1, 2, 3, 4];

  return (
    <>
      {/* Steps Container */}
      <div className="place-holder-steps-container">
        {steps.map((step) => (
          <div className="place-holder-steps" key={step}>
            <div className="place-holder-steps-number">{step}</div>
            <div className="place-holder-steps-block">
              <div className="place-holder-subheading" />
              <div className="place-holder-heading" />
            </div>
          </div>
        ))}
      </div>

      <div className="place-holder-form-body">
        <div className="place-holder-form-body-content">
          <div className="place-holder-form-title" />
          <div className="place-holder-form-subtitle" />
          <div>
            {[1, 2, 3].map((field) => (
              <div className="place-holder-form-group" key={field}>
                <div className="place-holder-form-label" />
                <input className="place-holder-form-input" type="text" />
              </div>
            ))}
          </div>
        </div>
        <div className="place-holder-form-action">
          <div className="place-holder-back-button"/>
          <div className="place-holder-next-button"/>
        </div>
      </div>
    </>
  );
};

export default PlaceholderMultiStepForm;
