import React, { useEffect } from 'react';
import io from 'socket.io-client';
import DefaultAvatar from '../../../public/avatar.png';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import LessonsChatMessage from '@/components/LessonsChat/LessonsChatMessage';
import SendIcon from '@mui/icons-material/Send';

const LessonsChat = () => {
  const user = useAppSelector(selectUser);
  const avatar = user && user.avatar ? user.avatar : DefaultAvatar;
  const socket = io('http://localhost:8000');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('getAllMessages', id);
    });

    socket.on('disconnect', () => {
      console.log('Connection is off');
    });

    // socket.on('message', ({ data })) => {
    //
    // }

    return () => {
      socket.disconnect();
    };
  }, [socket, id]);

  return (
    <>
      <div>
        <LessonsChatMessage
          userId={2}
          displayName={'Jake'}
          avatar={'asd'}
          message={'text message'}
          createdAt={'2023-05-03 20:19:17.937+06'}
        />
        <LessonsChatMessage
          userId={1}
          displayName={'John'}
          avatar={'asd'}
          message={'etext messagetext messagetext messagetext messagetext messagetext message'}
          createdAt={'2023-05-03 20:19:17.937+06'}
        />
      </div>
      {/*<Image src={avatar} className="comment-form_user-avatar" alt="avatar" width={100} height={100} />*/}
      <div className="input-block">
        <input type="text" />
        <SendIcon className="input-block-send-icon" fontSize="large" />
      </div>
    </>
  );
};

export default LessonsChat;
