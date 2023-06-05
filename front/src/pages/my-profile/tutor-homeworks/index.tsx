import React from 'react';

const TutorHomeworks = () => {
  return (
    <div className="tutor-homeworks-block container">
      <div className="tutor-homeworks-block-header">
        <h5 className="tutor-homeworks-block-header_title">Tutor Homework</h5>
      </div>
      <div className="tutor-homeworks-block-main">
        <table className="tutor-homeworks-main_table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Articles</th>
              <th>Added Date</th>
              <th>Status</th>
              <th>Creator Name</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td>9066</td>
              <td>How to represent data: 4 ways of representation through charts</td>
              <td>25 Oct 2021</td>
              <td className="homework-status">In Process</td>
              <td>Mark Ross</td>
              <td className="edit-status">
                <button>Edit status</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tutor-homeworks-block-footer">
        <div className="tutor-homeworks-block-footer_controls">
          <span>Add new homework</span>
          <button className="button add-new-homework-button"></button>
        </div>
      </div>
    </div>
  );
};

export default TutorHomeworks;
