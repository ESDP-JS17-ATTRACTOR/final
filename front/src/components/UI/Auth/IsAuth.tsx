import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';

const IsAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default IsAuth;
