import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchModuleLessons } from '@/features/usersLessons/usersLessonsThunks';
import { selectModuleLessons } from '@/features/usersLessons/usersLessonsSlice';
import ModuleLessonPreviewCard from '@/components/Cards/ModuleLessonPreviewCard';
import IsAuth from '@/components/UI/Auth/IsAuth';

const Module = () => {
  const dispatch = useAppDispatch();
  const moduleLessons = useAppSelector(selectModuleLessons);
  const moduleId = useRouter().query.id;

  useEffect(() => {
    dispatch(fetchModuleLessons(moduleId as string));
  }, [dispatch, moduleId]);

  let content = moduleLessons.map((moduleLesson) => {
    return <ModuleLessonPreviewCard key={moduleLesson.id} moduleLesson={moduleLesson} moduleId={moduleId as string} />;
  });

  return (
    <div className="container">
      {moduleLessons.length !== 0 ? (
        <div className="module-lesson-general-block">
          <div className="module-lessons-block-header">
            <h5 className="module-lessons-block-header_title">Mastermind by launches 01.02.2023</h5>
          </div>
          <div className="module-lessons-block-main">{content}</div>
        </div>
      ) : (
        <div className="module-lesson-general-block">
          <div className="module-lessons-block-header">
            <h5 className="module-lessons-block-header_title">There are no lessons in this module yet</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsAuth(Module);
