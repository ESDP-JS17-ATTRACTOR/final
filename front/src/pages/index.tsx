import React, {PropsWithChildren} from "react";
import {en} from '../../public/locales/en/mainBlock';
import {ru} from '../../public/locales/ru/mainBlock';
import {useRouter} from "next/router";

const Home: React.FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;

  return (
    <>
      <main>
        <div className="invitation-block">
          <div className="invitation-block-container container">
            <div className="invintation-info">
              <div className="invitation-info_text">
                <h1>
                  {t.mainTitle1}
                  <span className="">
                    {t.mainTitleBold}
                  </span>
                  {t.mainTitle2}
                </h1>
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
