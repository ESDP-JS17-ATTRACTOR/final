import React from 'react';
import ProfitsCard from "@/components/Cards/ProfitsCard";
import CoursePreviewCard from "@/components/Cards/CoursePreviewCard";

const Profits = () => {
  return (
    <div className="profits">
     <div className="profits-container">
       <h3 className="profits-container-calculate">Calculate profits</h3>
       <div className="profits-container-cards">
         <CoursePreviewCard/>
         <CoursePreviewCard/>
         <CoursePreviewCard/>
         <CoursePreviewCard/>
       </div>
       <button className="profits-container-btn">10 courses from 23</button>
     </div>
    </div>
  );
};

export default Profits;