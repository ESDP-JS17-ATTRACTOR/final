import React, { useEffect } from 'react';
import CoursesTable from '@/components/Tables/CoursesTables/CoursesTable';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchUserPurchases } from '@/features/purchases/puchasesThunks';
import { selectUsersPurchases } from '@/features/purchases/purchasesSlice';
import Link from 'next/link';

const MyCourses = () => {
  const dispatch = useAppDispatch();
  const userPurchases = useAppSelector(selectUsersPurchases);

  useEffect(() => {
    dispatch(fetchUserPurchases());
  }, [dispatch]);

  return (
    <div>
      {userPurchases.length !== 0 ? (
        <div className="user-courses-block container">
          <div className="user-courses-block-header">
            <h5 className="user-courses-block-header_title">My courses</h5>
          </div>
          <CoursesTable courses={userPurchases} />
        </div>
      ) : (
        <div className="user-courses-block user-courses-block-titles container">
          <h1>You have not purchased courses yet </h1>
          <div className="user-courses-block-title">
            <h1 className="user-courses-block-title-link">You can buy courses</h1>
            <Link href="/catalogs" className="user-courses-block-link">
              here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
