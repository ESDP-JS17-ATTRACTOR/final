import React from "react";
import { useRouter } from "next/router";

const Module = () => {
  const moduleId = useRouter().query.id;

  return (
    <div className="container">
      <div className="module-lesson-general-block">
        <div className="module-lessons-block-header">
          <h5 className="module-lessons-block-header_title">Mastermind by launches 01.02.2023</h5>
        </div>
        <div className="module-lessons-block-main">
          <div className="lesson-preview-card">
            <div className="lesson-preview-card_status">
              Status
            </div>
            <div className="lesson-preview-card_content">
              <div className="lesson-preview-card_content_image">
                <img src="/lesson-preview-image.png" alt="" />
              </div>
              <div className="lesson-preview-card_content_info">
                <h6 className="lesson-preview-card_content_info_title">
                  Module 1 Lesson 4
                </h6>
                <p className="lesson-preview-card_content_info_description">
                  <span>How to represent data:</span>
                  4 ways of representation through charts
                </p>
                <div className="lesson-preview-card_content_info_date">
                  <span>23\11\2023</span>
                </div>
                <button className="button lesson_view_btn">
                  viewed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;