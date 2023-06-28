import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  image: string;
}

const StudentWorkPreviewCard: React.FC<Props> = ({ image }) => {
  return (
    <div className="students-work_card">
      <div className="students-work_card_info">
        <Image src={image} alt="image" width={307} height={295} />
        <div className="students-work_card_info_description">
          <h6>Volfram web</h6>
          <Link href="/students-works">learn more</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentWorkPreviewCard;
