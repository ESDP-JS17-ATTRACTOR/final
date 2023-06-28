import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ru } from '../../../public/locales/ru/mainBlock';
import { en } from '../../../public/locales/en/mainBlock';

interface Props {
  image: string;
}

const StudentWorkPreviewCard: React.FC<Props> = ({ image }) => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div className="students-work_card">
      <div className="students-work_card_info">
        <Image src={image} alt="image" width={307} height={295} />
        <div className="students-work_card_info_description">
          <h6>Volfram web</h6>
          <Link href="/">{t.learnBtn}</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentWorkPreviewCard;
