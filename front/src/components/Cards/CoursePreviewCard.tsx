import React from 'react';
import { Course } from '../../../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ru } from '../../../public/locales/ru/mainBlock';
import { en } from '../../../public/locales/en/mainBlock';

interface Props {
  course: Course;
}

const CoursePreviewCard: React.FC<Props> = ({ course }) => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
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
          <li className="course-preview-card-main_details_item">{t.usersAmount}</li>
          <li className="course-preview-card-main_details_item">{t.fileStorage} - 1 GB</li>
        </ul>
        <Link href="#myForm">
          <button className="course-preview-card-main_button">{t.selectBtn}</button>
        </Link>
      </div>
    </div>
  );
};

export default CoursePreviewCard;
