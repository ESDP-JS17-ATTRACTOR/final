import React from 'react';
import StartedCard from "@/components/Cards/StartedCard";

const Started = () => {
  return (
    <div className="started">
      <div className="started-titles">
        <h1 className="started-titles-white">HOW DO I </h1>
        <h1 className="started-titles-orange">GET STARTED?</h1>
      </div>
      <p className="started-description">At the beginning of each billing period, such as a week or a year (depending on
        the type of subscription), your account will be automatically debited.</p>
      <div className="started-cards">
        <StartedCard/>
        <StartedCard/>
        <StartedCard/>
      </div>
      <button className="started-btn">
        Discuss the course
      </button>
    </div>
  );
};

export default Started;