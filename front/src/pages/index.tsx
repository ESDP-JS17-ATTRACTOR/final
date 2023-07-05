import React, { PropsWithChildren } from 'react';
import { en } from '../../public/locales/en/mainBlock';
import { ru } from '../../public/locales/ru/mainBlock';
import { useRouter } from 'next/router';
import Article from '@/components/UI/Article/Article';
import Profits from '@/components/UI/Profits/Profits';
import Started from '@/components/UI/Started/Started';
import StudentWorks from '@/components/UI/StudentWorks/StudentWorks';
import Team from '@/components/UI/Team/Team';
import Footer from '@/components/UI/Footer/Footer';
import Registration from '@/components/UI/Auth/Registration';
import Login from '@/components/UI/Auth/Login';
import { GetServerSideProps } from 'next';
import { wrapper } from '@/app/store';
import { fetchCourses } from '@/features/courses/coursesThunks';
import Link from 'next/link';

const Home: React.FC<PropsWithChildren> = ({ children }) => {
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
                  <span className="">{t.mainTitleBold}</span>
                  {t.mainTitle2}
                </h1>
                <p>{t.subTitle}: 1</p>
              </div>
              <div className="invitation-info_buttons">
                <Link href="#myForm">
                  <button className="button start_btn">{t.startBtn}</button>
                </Link>
                <Link href="#myForm">
                  <button className="button contact_btn">{t.contactBtn}</button>
                </Link>
              </div>
            </div>
            <div className="invitation-contacts">
              <a
                href="https://www.facebook.com/cholponakhmdesign"
                target="_blank"
                className="contact-link contact-link_facebook"
              >
                Facebook
              </a>
              <a href="https://wa.me/996707924217" target="_blank" className="contact-link contact-link_whatsapp">
                WhatsApp
              </a>
              <a
                href="https://instagram.com/cholponah_design?igshid=MzRlODBiNWFlZA=="
                target="_blank"
                className="contact-link contact-link_instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <Article />
        <Profits />
        <Started />
        <StudentWorks />
        <Team />
        <Footer />
      </main>
      <Registration />
      <Login />
      {children}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
  await store.dispatch(fetchCourses());
  return { props: {} };
});
