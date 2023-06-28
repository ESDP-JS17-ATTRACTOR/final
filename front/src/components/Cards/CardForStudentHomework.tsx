import React from 'react';
import { apiURL } from '../../../constants';

interface Props {
  id?: string;
  title?: string;
  date?: string;
  studentName: string;
  status: string;
  isChecked: string;
  checked: () => void;
  onTitleClick?: () => void;
  showInfo?: boolean;
  studentFiles?: string[];
  feedback?: string;
}

const CardForStudentHomework: React.FC<Props> = ({
  id,
  title,
  date,
  studentName,
  status,
  isChecked,
  checked,
  onTitleClick,
  showInfo,
  studentFiles,
  feedback,
}) => {
  return (
    <>
      <div className="card-for-homework-block">
        <div style={{ width: '90px', overflow: 'hidden' }}>
          <p>{id}</p>
        </div>
        <div style={{ width: '390px', overflow: 'hidden' }}>
          <p className="heading-hover" onClick={onTitleClick}>
            {title}
          </p>
        </div>
        <div style={{ width: '280px', overflow: 'hidden' }}>
          <p>{date}</p>
        </div>
        <div style={{ width: '130px', overflow: 'hidden' }}>
          <p>{status}</p>
        </div>
        <div style={{ width: '150px', overflow: 'hidden' }}>
          <p>{studentName}</p>
        </div>
        <div style={{ width: '150px', overflow: 'hidden' }}>
          <p className="heading-hover" onClick={checked}>
            {isChecked}
          </p>
        </div>
      </div>
      {showInfo && (
        <div>
          {studentFiles &&
            studentFiles.map((file, index) => (
              <p key={index}>
                <a href={apiURL + '/' + file}>PDF FILE {index + 1}</a>
              </p>
            ))}
          <h3>Feedback</h3>
          <div style={{ marginBottom: '20px' }}>{feedback}</div>
        </div>
      )}
    </>
  );
};

export default CardForStudentHomework;
