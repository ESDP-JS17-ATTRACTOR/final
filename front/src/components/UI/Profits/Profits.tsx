import React from 'react';
import CoursePreviewCard from '@/components/Cards/CoursePreviewCard';
import { useAppSelector } from '@/app/hooks';
import { selectCourses } from '@/features/courses/coursesSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const Profits = () => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  const courses = useAppSelector(selectCourses);
  return (
    <div className="profits">
      <div className="profits-container">
        <h3 className="profits-container-calculate">{t.profitsTitle}</h3>
        <div className="profits-container-cards">
          {courses.map((course) => {
            return <CoursePreviewCard course={course} key={course.id} />;
          })}
        </div>
        <Link href="/catalogs" style={{ textAlign: 'center' }}>
          <button className="profits-container-btn">4 {t.coursesAmount} 4</button>
        </Link>
      </div>
    </div>
  );
};

export default Profits;
