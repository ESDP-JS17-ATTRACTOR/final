import React, {useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {createUsersLessons, fetchOneUsersLesson} from "@/features/usersLessons/usersLessonsThunks";
import {selectOneUsersLesson} from "@/features/usersLessons/usersLessonsSlice";
import {useRouter} from "next/router";
import { selectUser } from "@/features/users/usersSlice";
import DefaultAvatar from "../../../../../public/avatar.png"

const Lesson = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const id = router.query.id as string;
  const usersLesson = useAppSelector(selectOneUsersLesson);

  const avatar = user && user.avatar ? user.avatar : DefaultAvatar;

  useEffect(() => {
    dispatch(fetchOneUsersLesson(id));
  }, [dispatch, id]);



  return (
    <div className="container">
      <div className="module-lesson-general-block">
        <div className="module-lesson-general-block-header">
          <h5 className="module-lesson-general-block-header_title">Mastermind by launches 01.02.2023</h5>
          <h6 className="module-lesson-general-block-header_subtitle">Module 1 Lesson 2</h6>
        </div>
        <div className="module-lesson-general-block-navigation">
          <Link href='/' className="module-lesson-general-block-navigation_link">Previous lesson</Link>
          <p className="module-lesson-general-block-navigation_serial"><span>3</span> of 44 lessons</p>
          <Link href='/' className="module-lesson-general-block-navigation_link">Next lesson</Link>
        </div>
        <div className="module-lesson-general-block-description">
          <p>Start watching the lesson(s) right now, and do your homework in the &quot;task&quot; section.</p>
          <p>I remind you that the lessons go to the course on Wednesdays at 12:00, and on Fridays at 12:30 Bishkek /
            09:30 Moscow time we call up on Zoom for feedback and answers to questions.</p>
        </div>
        <div className="module-lesson-general-block-navigation-mobile">
          <Link href='/' className="module-lesson-general-block-navigation-mobile_link">Previous lesson</Link>
          <Link href='/' className="module-lesson-general-block-navigation-mobile_link">Next lesson</Link>
        </div>
        <div className="module-lesson-general-block-player">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=OeCR-ZJa1Lw"
            controls={true}
          />
        </div>
        <div className="module-lesson-general-block-status">
          <span className="module-lesson-general-block-status_info">unviewed</span>
        </div>
        <div className="module-lesson-general-block-confirm_info">
          <p>By clicking on the &quot;confirm&quot; button, you confirm the viewing of the lesson in full.</p>
          <button className="button module-lesson-general-block-confirm_info_button">confirm</button>
        </div>
        <div className="module-lesson-general-block-comment-block">
          <Image
            src={avatar}
            className="comment-form_user-avatar"
            alt="avatar"
            width={100}
            height={100}
          />
          <input type="text"/>
        </div>

      </div>
    </div>
  );
};

export default Lesson;
