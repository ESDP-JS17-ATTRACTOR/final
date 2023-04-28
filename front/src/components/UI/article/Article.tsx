import React from 'react';

const Article = () => {
  return (
    <div className="article">
      <div className="article-left-side">
      </div>
      <div className="article-right-side">
        <div className="article-right-side-titles">
          <h1 className="article-right-side-titles-title-white">What is </h1>
          <h1 className="article-right-side-titles-title-orange">on line course</h1>
        </div>
        <div className="article-right-side-description">
          <p>
            We will help you learn the current profession and start a career. Become a specialist in the promotion of
            goods,
            services and brands on the Internet. Learn to research the market, develop a product idea, launch
            advertising
            campaigns and analyze their results. Master web analytics services in practice, learn how to build a
            customer
            journey map, conduct UX research and present their results to the customer. You can start without
            experience,
            and find your first job within 6 months after the start of training.
          </p>
        </div>
        <button className="article-right-side-btn">Tell me more</button>
      </div>
    </div>
  );
};

export default Article;