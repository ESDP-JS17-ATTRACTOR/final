import React from 'react';

const CardForHomework = () => {
    return (
        <div className="card-for-homework-block">
            <p>999</p>
            <div style={{width: "400px", overflow: "hidden"}}>
               <p>Нарисовать круг, нарисовать прямоугольник, нарисовать квадрат</p>
            </div>
            <p>12.12.2024</p>
            <p>In process</p>
            <p>Mark Ross</p>
            <button className="button homework-btn">Подробнее</button>
        </div>
    );
};

export default CardForHomework;