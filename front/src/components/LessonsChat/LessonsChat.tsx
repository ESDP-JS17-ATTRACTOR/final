import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DefaultAvatar from '../../../public/avatar.png';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import LessonsChatMessage from '@/components/LessonsChat/LessonsChatMessage';
import SendIcon from '@mui/icons-material/Send';
import { ChatMsg } from '../../../types';
import { apiURL } from '../../../constants';

const LessonsChat = () => {
  const user = useAppSelector(selectUser);
  const avatar = user && user.avatar ? user.avatar : DefaultAvatar;
  const socket = io(apiURL);
  const router = useRouter();
  const { id } = router.query;
  const [msgState, setMsgState] = useState<ChatMsg[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const socket = io(apiURL);

    socket.on('connect', () => {
      console.log('Client connected');
    });

    socket.on('start', (allMessages: ChatMsg[]) => {
      setMsgState(allMessages);
    });

    socket.on('message', (newMessage: ChatMsg) => {
      console.log(msgState);
      setMsgState((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('connect');
    };
  }, [socket, msgState, id]);

  const handleSubmitMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    socket.emit('message', { data: value });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const buildNewMessage = (message: ChatMsg) => {
    setMsgState((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (message: string) => {
    if (user && typeof id === 'string') {
      const messageToSend = {
        author: user.id,
        lesson: parseInt(id),
        message: message,
      };
      socket.emit('message', { data: messageToSend });
      setMessage('');
      console.log(msgState);
    }
  };

  return (
    <>
      <div>
        {msgState.map((message) => (
          <LessonsChatMessage
            key={message.id}
            userId={message.userId}
            displayName={message.displayName}
            avatar={message.avatar}
            message={message.message}
            createdAt={message.createdAt}
          />
        ))}
        {/*<LessonsChatMessage*/}
        {/*  userId={2}*/}
        {/*  displayName={'Jake'}*/}
        {/*  avatar={'asd'}*/}
        {/*  message={'text message'}*/}
        {/*  createdAt={'2023-05-03 20:19:17.937+06'}*/}
        {/*/>*/}
        {/*<LessonsChatMessage*/}
        {/*  userId={1}*/}
        {/*  displayName={'John'}*/}
        {/*  avatar={'asd'}*/}
        {/*  message={'etext messagetext messagetext messagetext messagetext messagetext message'}*/}
        {/*  createdAt={'2023-05-03 20:19:17.937+06'}*/}
        {/*/>*/}
      </div>
      {/*<Image src={avatar} className="comment-form_user-avatar" alt="avatar" width={100} height={100} />*/}
      <div className="input-block">
        <input type="text" value={message} onChange={inputChangeHandler} />
        <SendIcon className="input-block-send-icon" fontSize="large" onClick={() => sendMessage(message)} />
      </div>
    </>
  );
};

export default LessonsChat;
