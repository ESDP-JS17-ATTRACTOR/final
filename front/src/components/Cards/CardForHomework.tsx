import React from 'react';

interface Props {
    id: string;
    title: string;
    date: string;
    tutorName: string;
    status?: string;
    isChecked?: string;
}

const CardForHomework: React.FC<Props> = ({id, title, date, tutorName, status, isChecked}) => {
    return (
        <div className="card-for-homework-block">
            <div style={{width: "90px",  overflow: "hidden"}}>
               <p>{id}</p>
            </div>
            <div style={{width: "390px", overflow: "hidden"}}>
               <p>{title}</p>
            </div>
            <div style={{width: "280px", overflow: "hidden"}}>
               <p>{date}</p>
            </div>
            <div style={{width: "130px", overflow: "hidden"}}>
               <p>{status}</p>
            </div>
            <div style={{width: "150px", overflow: "hidden"}}>
               <p>{tutorName}</p>
            </div>
            <div style={{width: "150px", overflow: "hidden"}}>
               <p>{isChecked}</p>
            </div>
        </div>
    );
};

export default CardForHomework;