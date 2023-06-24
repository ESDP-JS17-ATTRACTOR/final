import React from 'react';
import Link from 'next/link';

const departments = () => {
  return (
    <div className="departments container">
      <div className="departments-top">
        <div className="departments-top-block">
          <div className="departments-top-block-social-links footer">
            <h2 className="departments-top-block-title">Следите за нами в соцсетях</h2>
            <div className="footer-block_links_social departments-top-block-social">
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
                <Link href="https://www.facebook.com/cholponakhmdesign">
                  <li className="social_link_facebook">Facebook</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="departments-top-block-requisites">
            <h2>Реквизиты</h2>
            <p>
              ООО «Система Геткурс»
              <br />
              ИНН 9731055900 / КПП 773101001
              <br />
              ОГРН 1197746675170
            </p>
            <p>
              ТОЧКА ПАО БАНКА «ФК Компаньон»
              <br />
              р/с 40702810601500056965
              <br />
              БИК 044525104
              <br />
              к/с 30101810745374525104
            </p>
          </div>
        </div>
      </div>
      <div className="departments-bottom">
        <div className="departments-bottom-contacts">
          <h2 className="departments-bottom-contacts-title">Другие варианты для связи с нами:</h2>
          <p>
            Телефон:
            <a href="callto:+996707924217" className="departments-bottom-contacts-number">
              +996707924217
            </a>
            <br />
          </p>
          <p>
            Почта:
            <a href="mailto:" className="departments-bottom-contacts-number">
              chipslol@gmail.com
            </a>
            <br />
          </p>
        </div>
        <div className="departments-bottom-addresses">
          <h2>Адреса:</h2>
          <p>
            Юридический адрес: г. Бишкек,
            <br />
            ул. Малдыбаева 7/2, 3 этаж, офис 301
            <br />
            Почтовый адрес: 720020, г. Бишкек,
          </p>
        </div>
      </div>
    </div>
  );
};

export default departments;
