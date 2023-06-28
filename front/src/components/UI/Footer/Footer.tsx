import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { UserData } from '../../../../types';
import { sendUserData } from '@/features/users/usersThunks';
import { selectFormDataLoading } from '@/features/users/usersSlice';
import { CircularProgress } from '@mui/material';

const Footer = () => {
  const dispatch = useAppDispatch();
  const formSubmitLoading = useAppSelector(selectFormDataLoading);
  const [state, setState] = useState<UserData>({
    name: '',
    email: '',
    message: '',
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(sendUserData(state));
    setState({
      name: '',
      email: '',
      message: '',
    });
  };
  return (
    <>
      <footer className="footer">
        <div className="footer-block_feedback">
          <div className="footer-block_feedback_bg">
            <form className="footer-block_feedback_bg_form" id="myForm" onSubmit={onFormSubmit}>
              <div className="footer-block_feedback_bg_title">
                <h6>
                  Lets get started your <span>course now</span>
                </h6>
              </div>
              <input
                className="feedback_input"
                placeholder="your name"
                type="text"
                id="name"
                value={state.name}
                onChange={inputChangeHandler}
                name="name"
                required
              />
              <input
                className="feedback_input"
                placeholder="your e-mail"
                type="email"
                id="email"
                value={state.email}
                onChange={inputChangeHandler}
                name="email"
                required
              />
              <textarea
                className="feedback_textarea"
                placeholder="message"
                name="message"
                value={state.message}
                onChange={inputChangeHandler}
                id="message"
                cols={30}
                rows={10}
              />
              <button className="button feedback_send_btn">
                {formSubmitLoading ? <CircularProgress /> : 'send information'}
              </button>
            </form>
          </div>
        </div>
        <div className="footer-block_links">
          <div className="footer-block_links_social">
            <ul className="social_links_list">
              <Link href="https://www.youtube.com/channel/UCaJPESY_U3fsb2IyUj4aAeQ" target="_blank">
                <li className="social_link_youtube">YouTube</li>
              </Link>
              <Link href="https://wa.me/996707924217" target="_blank">
                <li className="social_link_whatsapp">WhatsApp</li>
              </Link>
              <Link href="https://instagram.com/cholponah_design?igshid=MzRlODBiNWFlZA==" target="_blank">
                <li className="social_link_instagram">Instagram</li>
              </Link>
              <Link href="https://www.facebook.com/cholponakhmdesign" target="_blank">
                <li className="social_link_facebook">Facebook</li>
              </Link>
            </ul>
          </div>
          <div className="footer-block_links_anchor">
            <Link href="/">UP</Link>
          </div>
          <div className="footer-block_links_navigation">
            <nav className="links_navigation">
              <ul className="links_navigation_list">
                <Link href="/catalogs">
                  <li>Services</li>
                </Link>
                <Link href="/about">
                  <li>Product Strategy</li>
                </Link>
                <Link href="/students-works">
                  <li>Product DesignWeb</li>
                </Link>
                <Link href="/development">
                  <li>Development</li>
                </Link>
                <Link href="/consumer-research">
                  <li>Consumer Research</li>
                </Link>
                <Link href="/links">
                  <li>Links</li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
