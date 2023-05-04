import React from 'react';

const Started = () => {
  return (
    <div className="started">
      <div className="started-title">
        <h4>How do i <span>get started?</span></h4>
      </div>
      <p className="started-description">At the beginning of each billing period, such as a week or a year (depending on
        the type of subscription), your account will be automatically debited.</p>
      <div className="started-cards">
        <div className="start-card start-card_1">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_1">step 1</span>
            <h6 className="start-card-content_title">Schedule a consultation</h6>
            <p className="start-card-content_description">
              Schedule a quick 30-minute free call with us so we can discuss your product idea and assess your needs in terms of product research, analysis, design, and development.
            </p>
          </div>
        </div>
        <div className="start-card start-card_2">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_2">step 2</span>
            <h6 className="start-card-content_title">Allow us to create a customized plan</h6>
            <p className="start-card-content_description">
              We believe that every client is unique and requires a personalized approach. Our team will strategically create a plan outlining how we’re going to work together and achieve product objectives.
            </p>
          </div>
        </div>
        <div className="start-card start-card_3">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_3">step 3</span>
            <h6 className="start-card-content_title">Lets execute the plan together</h6>
            <p className="start-card-content_description">
              Your product idea will only take off like a rocket if you execute it well. We’ll put a launch plan in place for you, and then we’ll be here as your go-to team to turn your product idea into reality.
            </p>
          </div>
        </div>
      </div>
      <button className="started-btn">
        Discuss the course
      </button>
    </div>
  );
};

export default Started;