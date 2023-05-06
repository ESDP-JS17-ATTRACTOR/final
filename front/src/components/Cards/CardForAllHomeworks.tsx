import React, {useState} from 'react';

interface Props {
    id: string;
    title: string;
    description: string;
    date: string;
    tutorName: string;
    pdf: string;
    lesson: string;
}

const CardForHomework: React.FC<Props> = ({id, title, description, date, tutorName, pdf, lesson}) => {
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
                <div style={{width: "180px",  overflow: "hidden"}}>
                    <p>{lesson}</p>
                </div>
                <div style={{width: "390px", overflow: "hidden"}}>
                    <p onClick={toggleTitle}>{title}</p>
                </div>
                <div style={{width: "200px", overflow: "hidden"}}>
                    <p>{date}</p>
                </div>
                <div style={{width: "300px", overflow: "hidden", marginRight: "10px"}}>
                    <a href={`http://localhost:8000/${pdf}`}>PDF FILE</a>
                </div>
                <button className="button profile-btn-add">Edit</button>
                <button className="button profile-btn-add">Delete</button>
            </div>
            {showDescription && <div style={{padding: "10px", borderBottom: "1px solid #4688C1"}}>{description}</div>}
        </>
    );
};

export default CardForHomework;