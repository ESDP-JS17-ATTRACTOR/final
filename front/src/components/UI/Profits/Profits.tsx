import React from 'react';
import CoursePreviewCard from '@/components/Cards/CoursePreviewCard';
import { useAppSelector } from '@/app/hooks';
import { selectCourses } from '@/features/courses/coursesSlice';
import Link from 'next/link';

const Profits = () => {
  const courses = useAppSelector(selectCourses);
  return (
    <div className="profits">
      <div className="profits-container">
        <h3 className="profits-container-calculate">Calculate profits</h3>
        <div className="profits-container-cards">
          {courses.map((course) => {
            return <CoursePreviewCard course={course} key={course.id} />;
          })}
        </div>
        <Link href="/catalogs" style={{ textAlign: 'center' }}>
          <button className="profits-container-btn">10 courses from 23</button>
        </Link>
      </div>
    </div>
  );
};

export default Profits;
