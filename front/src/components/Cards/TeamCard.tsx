import React from 'react';
import Image from 'next/image';
import teamCardImage from '../../../public/team-man.png';

const TeamCard = () => {
  return (
    <div className="team-cards-card">
      <Image
        className="team-cards-card-image"
        src={teamCardImage}
        alt="Team Card 1"
      />
      <p className="team-cards-card-name">Nino</p>
      <p className="team-cards-card-position">Project Manager</p>
      <p className="team-cards-card-description">
        With her extensive background in managing IT teams, she proudly succeeds in all her projects. She has a side
        passion for writing fiction stories, playing guitar, singing, and traveling.
      </p>
    </div>
  );
};

export default TeamCard;
