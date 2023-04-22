import React from 'react';
import CardForHomework from "@/components/UI/CardForHomework";

const MyProfile = () => {
    return (
        <div className="container">
            <div className="profile-block">
                <h1>My Profile</h1>
                <div className="profile-main-info-block">
                    <div><img className="profile-avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0VGHL3JrJAD7mgw9FP77qpKv0IuIv_p2hg&usqp=CAU" alt=""/></div>
                    <div className="profile-info-block">
                        <div>
                        <h5>Email:</h5><span> asd@gmail.com</span>
                        </div>
                        <div>
                        <h5>Full name:</h5><span> Asd</span>
                        </div>
                        <div>
                        <h5>Country:</h5><span> Bishkek</span>
                        </div>
                        <button className="button profile-btn">Edit</button>
                    </div>
                </div>
            </div>
            <div className="homework-block">
                <h2>Homework</h2>
                <div className="homework-headlines-block">
                    <p>ID</p>
                    <p>Articles</p>
                    <p>Added date</p>
                    <p>Status</p>
                    <p>Tutor name</p>
                </div>
                <CardForHomework/>
                <CardForHomework/>
            </div>
        </div>
    );
};

export default MyProfile;