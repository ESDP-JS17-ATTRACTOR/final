import React from "react";
import CoursesTable from "@/components/Tables/CoursesTables/CoursesTable";
import { UsersCourse } from "../../../types";

const MyCourses = () => {
  const testData: UsersCourse[] = [
    {id: 1, category: "SMM", title: "Test Title", tutor: "Test Tutor", modules: [{
        id: 1, number: 1, title: "Test Module Title", lessons: 4
      }, {
        id: 2, number: 2, title: "Test Module Title 2", lessons: 3
      }]}, {id: 2, category: "Mobilography", title: "Test Title", tutor: "Test Tutor", modules: [{
        id: 1, number: 1, title: "Test Module Title", lessons: 4
      }, {
        id: 2, number: 2, title: "Test Module Title 2", lessons: 3
      }]},
  ]

  return (
    <div className="user-courses-block container">
    <div className="user-courses-block-header">
    <h5 className="user-courses-block-header_title">My courses</h5>
  </div>
  <CoursesTable courses={testData}/>
  </div>
);
};

export default MyCourses;