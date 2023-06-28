import React from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  position: string;
  info: string;
}

const TeamCard: React.FC<Props> = ({ image, name, position, info }) => {
  return (
    <div className="team-card_bg">
      <div className="team-card">
        <div className="team-card_photo">
          <Image src={image} alt="Photo" width={172} height={167} />
        </div>
        <div className="team-card_info">
          <span className="team-card_info_name">{name}</span>
          <span className="team-card_info_job-title">{position}</span>
          <p className="team-card_info_description">{info}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
