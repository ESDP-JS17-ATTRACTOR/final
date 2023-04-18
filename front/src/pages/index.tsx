import {Inter} from 'next/font/google'
import React, {PropsWithChildren} from "react";

const inter = Inter({subsets: ['latin']})

const Home: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <main>
                <div className="invitation-block">
                    <div className="invitation-block-container container">
                        <div className="invintation-info">
                            <div className="invitation-info_text">
                                <h1>Start saving <span className="">your course</span> today!</h1>
                                <p>We are collecting courses for you. courses in the system: 21</p>
                            </div>
                            <div className="invitation-info_buttons">
                                <button className="button start_btn">Get started for free</button>
                                <button className="button contact_btn">Contact sales</button>
                            </div>
                        </div>
                        <div className="invitation-contacts">
                            <img src="/main-pic.png" alt="Main Pic"/>
                            {/*<div>*/}
                            {/*    <button>Facebook</button>*/}
                            {/*    <button>WhatsApp</button>*/}
                            {/*    <button>Instagram</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className="info-block">
                    <div className="container">

                    </div>
                </div>
            </main>
            {children}
        </>
    )
}

export default Home;
