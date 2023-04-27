import React from 'react';
import ProfitsCard from "@/components/Cards/ProfitsCard";

const Profits = () => {
  return (
    <div className="profits">
     <div className="profits-container">
       <h2 className="profits-container-calculate">Calculate profits</h2>
       <div className="profits-container-cards">
         <ProfitsCard/>
         <ProfitsCard/>
         <ProfitsCard/>
         <ProfitsCard/>
       </div>
       <button className="profits-container-btn">10 courses from 23</button>
     </div>
    </div>
  );
};

export default Profits;