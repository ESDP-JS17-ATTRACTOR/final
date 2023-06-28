import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { en } from '../../../../public/locales/en/mainBlock';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { useRouter } from 'next/router';

const Article = () => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div className="article">
      <div className="article-left-side">
        <Image src="/workingGirl.png" alt="Image" width={247} height={195} />
      </div>
      <div className="article-right-side">
        <div className="article-right-side-titles">
          <h2>
            {t.articlesTitle1} <span>{t.articlesTitle2}</span>
          </h2>
        </div>
        <div className="article-right-side-description">
          <p>{t.articlesText}</p>
        </div>
        <div className="article-right-side-btn">
          <Link href="/about">
            <button>{t.moreBtn}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
