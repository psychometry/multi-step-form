import { FC } from "react";
import "./ThankYouView.css";

const ThankYouView: FC = () => {
  return (
    <div className="thank-you-container">
      <img src="/icon-thank-you.svg" alt="Thank you" className="thank-you-icon" />
      <h2 className="thank-you-title">Thank you!</h2>
      <p className="thank-you-message">
        Thanks for confirming your subscription! We hope you have fun using our platform. 
        If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
};

export default ThankYouView;