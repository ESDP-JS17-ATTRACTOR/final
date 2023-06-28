import React from 'react';
import Link from 'next/link';
import StudentWorkPreviewCard from '@/components/Cards/StudentWorkPreviewCard';

const StudentWorks = () => {
  return (
    <div className="students-works-block">
      <div className="students-works-block_title">
        <h6>
          work of our students to get <span>a success</span>
        </h6>
      </div>
      <div className="students-works-block_content">
        <div className="students-works_content_description">
          <span>implementation experience</span>
          <p>
            Creation of websites and web applications for business: high-load services, cloud solutions, marketplaces,
            development of native mobile applications for iOS and Android
          </p>
          <Link href="/students-works">
            <button className="button work_view_btn">View all</button>
          </Link>
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