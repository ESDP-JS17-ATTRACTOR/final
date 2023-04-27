import React from 'react';
import TeamCard from "@/components/Cards/TeamCard";

const Team = () => {
  return (
    <div className="team">
      <h2 className="team-title">Our Team</h2>
     <div className="team-cards">
       <TeamCard/>
       <TeamCard/>
       <TeamCard/>
     </div>
    </div>
  );
};

export default Team;