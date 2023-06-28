import React from 'react';
import StudentWorkPreviewCard from '@/components/Cards/StudentWorkPreviewCard';
import { useRouter } from 'next/router';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const StudentWorks = () => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div className="students-works-block">
      <div className="students-works-block_title">
        <h6>
          {t.worksTitle1} <span>{t.worksTitle2}</span>
        </h6>
      </div>
      <div className="students-works-block_content">
        <div className="students-works_content_description">
          <span>{t.implementation}</span>
          <p>{t.worksText}</p>
          <button className="button work_view_btn">{t.viewBtn}</button>
        </div>
        <div className="students-works_content_cards">
          <StudentWorkPreviewCard image={'/work-card-1.png'} />
          <StudentWorkPreviewCard image={'/work-card-2.png'} />
          <StudentWorkPreviewCard image={'/work-card-3.png'} />
        </div>
      </div>
    </div>
  );
};

export default StudentWorks;
