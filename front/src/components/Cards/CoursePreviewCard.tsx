import React from "react";

const CoursePreviewCard = () => {
  return (
    <div className="course-preview-card">
      <div className="course-preview-card-header">
        <h5 className="course-preview-card-header_title">SMM</h5>
      </div>
      <div className="course-preview-card-main">
        <p className="course-preview-card-main_price">$500 <span>month</span></p>
        <ul className="course-preview-card-main_details">
          <li className="course-preview-card-main_details_item">Up to 5 users</li>
          <li className="course-preview-card-main_details_item">File storage - 1 GB</li>
        </ul>
      </div>
    </div>
  );
};

export default CoursePreviewCard;