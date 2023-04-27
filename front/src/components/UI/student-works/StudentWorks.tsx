import React from 'react';
import StudentWorksCard from "@/components/Cards/StudentWorksCard";

const StudentWorks = () => {
  return (
    <div className="students-works">
      <p className="students-works-title">work of our students to <span className="students-works-title-orange">get a success</span></p>
      <div className="students-works-cards">
        <div className="students-works-cards-left-side">
          <p className="students-works-cards-left-side-orange-text">
            implementation experience</p>
          <p className="students-works-cards-left-side-text">Creation of websites and web applications for business: high-load services, cloud
            solutions, marketplaces, development of native mobile applications for iOS and Android</p>
          <button className="students-works-cards-left-side-btn">View all</button>
        </div>
        <div className="students-works-cards-right-side">
          <StudentWorksCard/>
          <StudentWorksCard/>
          <StudentWorksCard/>
        </div>
      </div>
    </div>
  );
};

export default StudentWorks;