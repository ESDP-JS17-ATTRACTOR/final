import React from 'react';

interface Props {
    id?: string;
    description?: string;
    date?: string;
    studentName: string;
    status: string;
}

const CardForStudentHomework: React.FC<Props> = ({id, description, date, studentName, status}) => {
    return (
        <div className="card-for-homework-block">
            <p>{id}</p>
            <div style={{width: "400px", overflow: "hidden"}}>
                <p>{description}</p>
            </div>
            <p>{date}</p>
            <p>{status}</p>
            <p>{studentName}</p>
            <button className="button homework-btn">Подробнее</button>
        </div>
    );
};

export default CardForStudentHomework;