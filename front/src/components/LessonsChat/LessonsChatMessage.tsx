import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { Avatar } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  userId: number;
  displayName: string;
  avatar: string;
  message: string;
  createdAt: Date;
}

const LessonsChatMessage: React.FC<Props> = ({ userId, displayName, avatar, message, createdAt }) => {
  const user = useAppSelector(selectUser);
  const isCurrentUser = user && user.id === userId;
  const timestamp = dayjs(createdAt).format('DD:MM:YYYY');

  return isCurrentUser ? (
    <div className="right-message-block">
      <div className="right-message-block-orange">
        <p className="right-message-block-orange-content">{message}</p>
        <div className="right-message-block-orange-timestamp">{timestamp}</div>
      </div>
    </div>
  ) : (
    <div className="left-message-block">
      <Avatar alt={displayName} className="left-message-block-display-name" src={avatar}></Avatar>
      <div>
        <div className="left-message-block-display-name">{displayName}</div>
        <div className="left-message-block-blue">
          <div>
            <p className="left-message-block-blue-content">{message}</p>
          </div>
          <div className="left-message-block-blue-timestamp">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonsChatMessage;
