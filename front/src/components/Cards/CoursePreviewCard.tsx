import React from 'react';
import { Course } from '../../../types';
import Link from 'next/link';

interface Props {
  course: Course;
}

const CoursePreviewCard: React.FC<Props> = ({ course }) => {
  return (
    <div className="course-preview-card">
      <div className="course-preview-card-header">
        <h5 className="course-preview-card-header_title">{course.title}</h5>
      </div>
      <div className="course-preview-card-main">
        <p className="course-preview-card-main_price">
          {course.price} $ <span>month</span>
        </p>
        <ul className="course-preview-card-main_details">
          <li className="course-preview-card-main_details_item">Up to 5 users</li>
          <li className="course-preview-card-main_details_item">File storage - 1 GB</li>
        </ul>
        <Link href="#myForm">
          <button className="course-preview-card-main_button">Select</button>
        </Link>
      </div>
    </div>
  );
};

export default CoursePreviewCard;
