import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { switchLoginModalWindow, switchRegistrationModalWindow } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const AnonymousMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div>
      <button className="login_btn" onClick={() => dispatch(switchLoginModalWindow())}>
        {t.login}
      </button>
      <button className="sign-up_btn" onClick={() => dispatch(switchRegistrationModalWindow())}>
        {t.sign}
      </button>
    </div>
  );
};

export default AnonymousMenu;
