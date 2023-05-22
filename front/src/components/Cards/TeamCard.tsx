import React from 'react';
import Image from 'next/image';

const TeamCard = () => {
  return (
    <div className="team-card_bg">
      <div className="team-card">
        <div className="team-card_photo">
          <Image src="/team-man.png" alt="Photo" width={172} height={167} />
        </div>
        <div className="team-card_info">
          <span className="team-card_info_name">Nino</span>
          <span className="team-card_info_job-title">Project Manager</span>
          <p className="team-card_info_description">
            With her extensive background in managing IT teams, she proudly succeeds in all her projects. She has a side
            passion for writing fiction stories, playing guitar, singing, and traveling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
