import React, {useState} from 'react';

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

const CardForHomework: React.FC<Props> = ({id, title, date, tutorName, status, isChecked, description, pdf}) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleTitle = () => {
        setShowDescription(!showDescription);
    }

    return (
        <>
        <div className="card-for-homework-block">
            <div style={{width: "90px",  overflow: "hidden"}}>
               <p>{id}</p>
            </div>
            <div style={{width: "390px", overflow: "hidden"}}>
               <p className="heading-hover" onClick={toggleTitle}>{title}</p>
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
            {showDescription && <div style={{padding: "10px", borderBottom: "1px solid #4688C1"}}>
                {description}
                <div>
                    {pdf ? <a href={`http://localhost:8000/${pdf}`}>PDF FILE</a> : null}
                </div>
            </div>}
        </>
    );
};

export default CardForHomework;