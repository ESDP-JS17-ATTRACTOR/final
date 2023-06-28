import React from 'react';
import LessonForm from '@/components/UI/Admin/LessonForm';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

const Id = () => {
  return (
    <div>
      <LessonForm />
    </div>
  );
};

export default IsAdmin(Id);
