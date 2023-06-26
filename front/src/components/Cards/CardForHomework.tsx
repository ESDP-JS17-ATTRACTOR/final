import React, { useState } from 'react';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  title: string;
  date: string;
  tutorName: string;
  status?: string;
  isChecked?: string;
  description: string;
  pdf: string;
}

const CardForHomework: React.FC<Props> = ({ id, title, date, tutorName, status, isChecked, description, pdf }) => {
  const [showDescription, setShowDescription] = useState(false);
  const fileUrl = apiURL + '/' + pdf;

  const toggleTitle = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
      <div className="card-for-homework-block">
        <div>
          <p>{id}</p>
        </div>
        <div>
          <p className="heading-hover" onClick={toggleTitle}>
            {title}
          </p>
        </div>
        <div>
          <p>{date}</p>
        </div>
        <div>
          <p>{status}</p>
        </div>
        <div>
          <p>{tutorName}</p>
        </div>
        <div>
          <p>{isChecked}</p>
        </div>
      </div>
      {showDescription && (
        <div>
          {description}
          <div>{pdf ? <a href={fileUrl}>PDF FILE</a> : null}</div>
        </div>
      )}
    </>
  );
};

export default CardForHomework;
