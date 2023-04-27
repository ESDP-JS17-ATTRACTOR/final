import React from 'react';

const FeedbackForm = () => {
  return (
    <form className="feedback">
      <input
        className="feedback_input"
        type="text"
        placeholder="your name"
      />
      <input
        className="feedback_input"
        type="email"
        placeholder="your e-mail"
      />
      <textarea
        className="feedback_textarea"
        placeholder="message"
      />
      <button className="feedback_button">
        Send information
      </button>
    </form>
  );
};

export default FeedbackForm;