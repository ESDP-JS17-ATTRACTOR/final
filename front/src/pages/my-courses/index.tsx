import React, { useEffect } from "react";
import CoursesTable from "@/components/Tables/CoursesTables/CoursesTable";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUserPurchases } from "@/features/purchases/puchasesThunks";
import { selectUsersPurchases } from "@/features/purchases/purchasesSlice";

const MyCourses = () => {
  const dispatch = useAppDispatch();
  const userPurchases = useAppSelector(selectUsersPurchases);

  useEffect(() => {
    dispatch(fetchUserPurchases());
  }, [dispatch]);


  return (
    <div className="user-courses-block container">
      <div className="user-courses-block-header">
        <h5 className="user-courses-block-header_title">My courses</h5>
      </div>
      <CoursesTable courses={userPurchases} />
    </div>
  );
};

export default MyCourses;