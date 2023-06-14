import React, { useEffect } from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchModuleLessons, fetchOneUsersLesson, updateUsersLesson } from '@/features/usersLessons/usersLessonsThunks';
import { selectModuleLessons, selectOneUsersLesson } from '@/features/usersLessons/usersLessonsSlice';
import { useRouter } from 'next/router';
import { apiURL } from '../../../../../constants';
import LessonsChat from '@/components/LessonsChat/LessonsChat';

const Lesson = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query.id as string;
  const usersLesson = useAppSelector(selectOneUsersLesson);
  const moduleLessons = useAppSelector(selectModuleLessons);

  const videoUrl = usersLesson && (usersLesson.lesson.video ?? usersLesson?.lesson.video);
  let nextLesson: string | null = null;
  let prevLesson: string | null = null;

  moduleLessons.forEach((lesson, index) => {
    if (lesson.number === usersLesson?.lesson.number) {
      if (index < moduleLessons.length - 1) {
        nextLesson = moduleLessons[index + 1].id.toString();
      }
      if (index > 0) {
        prevLesson = moduleLessons[index - 1].id.toString();
      }
    }
  });

  const confirmView = async () => {
    if (usersLesson && usersLesson.id) {
      await dispatch(updateUsersLesson(usersLesson.id.toString())).unwrap();
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOneUsersLesson(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (usersLesson?.lesson.module.id) {
      dispatch(fetchModuleLessons(usersLesson.lesson.module.id.toString()));
    }
  }, [usersLesson, dispatch]);

  return (
    <div className="container">
      <div className="module-lesson-general-block">
        <div className="module-lesson-general-block-header">
          <h5 className="module-lesson-general-block-header_title">Mastermind by launches 01.02.2023</h5>
          <h6 className="module-lesson-general-block-header_subtitle">
            Module {usersLesson?.lesson.module.number} Lesson {usersLesson?.lesson.number}
          </h6>
        </div>
        <div className="module-lesson-general-block-navigation">
          <Link
            href={`/my-courses/modules/lesson/${prevLesson}`}
            className={`module-lesson-general-block-navigation_link ${prevLesson === null ? 'disabled-link' : ''}`}
          >
            Previous lesson
          </Link>
          <p className="module-lesson-general-block-navigation_serial">
            <span>{usersLesson?.lesson.number}</span> of {moduleLessons.length} lessons
          </p>
          <Link
            href={`/my-courses/modules/lesson/${nextLesson}`}
            className={`module-lesson-general-block-navigation_link ${nextLesson === null ? 'disabled-link' : ''}`}
          >
            Next lesson
          </Link>
        </div>
        <div className="module-lesson-general-block-description">
          <p>Start watching the lesson(s) right now, and do your homework in the &quot;task&quot; section.</p>
          <p>
            I remind you that the lessons go to the course on Wednesdays at 12:00, and on Fridays at 12:30 Bishkek /
            09:30 Moscow time we call up on Zoom for feedback and answers to questions.
          </p>
        </div>
        <div className="module-lesson-general-block-navigation-mobile">
          <Link href="/" className="module-lesson-general-block-navigation-mobile_link">
            Previous lesson
          </Link>
          <Link href="/" className="module-lesson-general-block-navigation-mobile_link">
            Next lesson
          </Link>
        </div>
        <div className="module-lesson-general-block-player">
          {videoUrl ? <ReactPlayer url={apiURL + '/' + videoUrl} controls={true} /> : <p>No video available</p>}
        </div>
        <div className="module-lesson-general-block-status">
          <span className="module-lesson-general-block-status_info">unviewed</span>
        </div>
        <div className="module-lesson-general-block-confirm_info">
          <p>By clicking on the &quot;confirm&quot; button, you confirm the viewing of the lesson in full.</p>
          <button className="button module-lesson-general-block-confirm_info_button" onClick={confirmView}>
            confirm
          </button>
        </div>
        <div className="module-lesson-general-block-comment-block">
          <LessonsChat />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
