import React, { useState } from 'react';
import {
  deleteHomework,
  editHomework,
  fetchHomeworksByTutor,
  fetchOneHomework,
} from '@/features/homeworks/homeworksThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import FormForHomework from '@/components/UI/MyProfile/FormForHomework';
import { Modal } from '@mui/material';
import { selectHomework } from '@/features/homeworks/homeworksSlice';
import { ApiHomework } from '../../../types';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  title: string;
  description: string;
  date: string;
  tutorName: string;
  pdf: string;
  lesson: string;
}

const CardForHomework: React.FC<Props> = ({ id, title, description, date, tutorName, pdf, lesson }) => {
  const dispatch = useAppDispatch();
  const homework = useAppSelector(selectHomework);
  const [showDescription, setShowDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileUrl = apiURL + '/' + pdf;

  const onEditClick = async () => {
    await dispatch(fetchOneHomework(id));
    setShowModal(true);
  };

  const onSubmit = async (homework: ApiHomework) => {
    await dispatch(editHomework({ id, homework }));
    setShowModal(false);
    await dispatch(fetchHomeworksByTutor());
  };

  const toggleTitle = () => {
    setShowDescription(!showDescription);
  };

  const removeHomework = async () => {
    await dispatch(deleteHomework(id));
    void dispatch(fetchHomeworksByTutor());
  };

  return (
    <>
      <div className="card-for-homework-block">
        <div style={{ width: '90px', overflow: 'hidden' }}>
          <p>{id}</p>
        </div>
        <div style={{ width: '180px', overflow: 'hidden' }}>
          <p>{lesson}</p>
        </div>
        <div style={{ width: '390px', overflow: 'hidden' }}>
          <p className="heading-hover" onClick={toggleTitle}>
            {title}
          </p>
        </div>
        <div style={{ width: '200px', overflow: 'hidden' }}>
          <p>{date}</p>
        </div>
        <div style={{ width: '300px', overflow: 'hidden', marginRight: '10px' }}>
          {pdf ? <a href={fileUrl}>PDF FILE</a> : <span>No files</span>}
        </div>
        <button onClick={onEditClick} className="button profile-btn-add">
          Edit
        </button>
        {homework && (
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <FormForHomework onSubmit={onSubmit} existHomework={homework} />
          </Modal>
        )}
        <button onClick={removeHomework} className="button profile-btn-add">
          Delete
        </button>
      </div>
      {showDescription && <div style={{ padding: '10px', borderBottom: '1px solid #4688C1' }}>{description}</div>}
    </>
  );
};

export default CardForHomework;
