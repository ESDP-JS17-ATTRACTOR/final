import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const Started = () => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div className="started">
      <div className="started-title">
        <h4>
          {t.startedTitle1} <span>{t.startedTitle2}</span>
        </h4>
      </div>
      <p className="started-description">{t.startedSubTitle}</p>
      <div className="started-cards">
        <div className="start-card start-card_1">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_1">{t.step} 1</span>
            <h6 className="start-card-content_title">{t.step1title}</h6>
            <p className="start-card-content_description">{t.step1text}</p>
          </div>
        </div>
        <div className="start-card start-card_2">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_2">{t.step} 2</span>
            <h6 className="start-card-content_title">{t.step2title}</h6>
            <p className="start-card-content_description">{t.step2text}</p>
          </div>
        </div>
        <div className="start-card start-card_3">
          <div className="start-card-content">
            <span className="start-card-content_sub-title step_3">{t.step} 3</span>
            <h6 className="start-card-content_title">{t.step3title}</h6>
            <p className="start-card-content_description">{t.step3text}</p>
          </div>
        </div>
      </div>
      <Link href="#myForm">
        <button className="started-btn">{t.discussBtn}</button>
      </Link>
    </div>
  );
};

export default Started;
