import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';

const IsAdmin = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    useEffect(() => {
      if (user) {
        if (user.role !== 'admin' && user.role !== 'moderator') {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default IsAdmin;
