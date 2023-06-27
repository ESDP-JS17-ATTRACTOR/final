import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/app/hooks';
import { UserData } from '../../../../types';
import { sendUserData } from '@/features/users/usersThunks';

const Footer = () => {
  const dispatch = useAppDispatch();
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
              <button className="button feedback_send_btn">send information</button>
            </form>
          </div>
        </div>
        <div className="footer-block_links">
          <div className="footer-block_links_social">
            <ul className="social_links_list">
              <Link href="/">
                <li className="social_link_youtube">YouTube</li>
              </Link>
              <Link href="https://wa.me/996707924217">
                <li className="social_link_whatsapp">WhatsApp</li>
              </Link>
              <Link href="https://instagram.com/cholponah_design?igshid=MzRlODBiNWFlZA==">
                <li className="social_link_instagram">Instagram</li>
              </Link>
              <Link href="/">
                <li className="social_link_twitter">Twitter</li>
              </Link>
              <Link href="https://www.facebook.com/cholponakhmdesign">
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
                <Link href="/">
                  <li>Services</li>
                </Link>
                <Link href="/">
                  <li>Product Strategy</li>
                </Link>
                <Link href="/">
                  <li>Product DesignWeb</li>
                </Link>
                <Link href="/">
                  <li>Development</li>
                </Link>
                <Link href="/">
                  <li>Consumer Research</li>
                </Link>
                <Link href="/">
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
