import React from 'react';

const ProfitsCard = () => {
  return (
    <div className="profits-container-cards-card">
      <h2 className="profits-container-cards-card-title">Product title</h2>
      <p className="profits-container-cards-card-price">
        $19.99<strong className="card_month">month</strong>
      </p>
      <p className="profits-container-cards-card-description">Product description line 1</p>
      <p className="profits-container-cards-card-description">Product description line 2</p>
      <button className="profits-container-cards-card-button">Buy now</button>
    </div>
  );
};

export default ProfitsCard;
