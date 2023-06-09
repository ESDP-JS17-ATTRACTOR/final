import React from 'react';
import { ModuleLesson } from '../../../types';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import Link from 'next/link';
import { apiURL } from '../../../constants';
import { useRouter } from 'next/router';

interface Props {
  moduleLesson: ModuleLesson;
  moduleId: string;
}

const ModuleLessonPreviewCard: React.FC<Props> = ({ moduleLesson, moduleId }) => {
  const viewedDate = moduleLesson.viewedAt ? dayjs(moduleLesson.viewedAt).format('DD/MM/yyyy') : '--/--/----';

  const lessonVideo = apiURL + '/' + moduleLesson.video;
  const router = useRouter();

  const handleClick = async () => {
    await router.push(`/my-courses/modules/lesson/${moduleLesson.number}`);
  };

  return (
    <div className="lesson-preview-card-bg">
      <div className="lesson-preview-card">
        <div className={`lesson-preview-card_status ${moduleLesson.isViewed ?? 'status_not-viewed'}`}>Status</div>
        <div className="lesson-preview-card_content">
          <div className="lesson-preview-card_content_video">
            <ReactPlayer url={lessonVideo} controls={false} />
          </div>
          <div className="lesson-preview-card_content_info">
            <h6 className="lesson-preview-card_content_info_title" onClick={handleClick}>
              Module {moduleLesson.moduleNumber} Lesson {moduleLesson.number}
            </h6>
            <p className="lesson-preview-card_content_info_description">
              <span>{moduleLesson.title}</span>
              {moduleLesson.description}
            </p>
            <div className="lesson-preview-card_content_info_date">
              <span>{viewedDate}</span>
            </div>
            <Link href={`/my-courses/modules/lesson/${moduleLesson.id}`} className="button lesson_view_btn">
              viewed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleLessonPreviewCard;
