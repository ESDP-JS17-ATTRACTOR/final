import React from 'react';
import FeedbackForm from "@/components/UI/footer/FeedbackForm";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-main-block">
          <div className="footer-main-block-left">

          </div>
          <div className="footer-main-block-right">
            <h2>Lets get started your</h2>
            <h2 className="footer-main-block-right-orange-text">course now</h2>
            <FeedbackForm/>
          </div>
        </div>
       <div className="footer-foot">
         <div className="footer-foot-social-links-block">
           <ul className="footer-foot-social-links-block-list">
             <li className="social-icons link-1"><a href="/youtube" className="social-link "></a></li>
             <li className="social-icons link-2"><a href="/wa" className="social-link"></a></li>
             <li className="social-icons link-3"><a href="/instagram" className="social-link"></a></li>
             <li className="social-icons link-4"><a href="/twitter" className="social-link"></a></li>
             <li className="social-icons link-5"><a href="/fb" className="social-link"></a></li>
           </ul>
         </div>
         <div className="footer-foot-links-block">
           <ul className="footer-foot-links-block-1">
             <li><a href="/team" className="footer-foot-links-block-link">Team</a></li>
             <li><a href="/careers" className="footer-foot-links-block-link">Careers</a></li>
           </ul>
           <ul className="footer-foot-links-block-2">
             <li><a href="/case-studies" className="footer-foot-links-block-link">Case studies</a></li>
             <li><a href="/contacts" className="footer-foot-links-block-link">Contacts</a></li>
             <li><a href="/about" className="footer-foot-links-block-link">About</a></li>
           </ul>
           <ul className="footer-foot-links-block-3">
             <li><a href="/services" className="footer-foot-links-block-link">Services</a></li>
             <li><a href="/product-strategy" className="footer-foot-links-block-link">Product strategy</a></li>
             <li><a href="/product-design" className="footer-foot-links-block-link">Product DesignWeb</a></li>
             <li><a href="/development" className="footer-foot-links-block-link">Development</a></li>
             <li><a href="/consumer-research" className="footer-foot-links-block-link">Consumer research</a></li>
             <li><a href="/links" className="footer-foot-links-block-link">Links</a></li>
           </ul>
         </div>
       </div>
      </footer>
    </>
  );
};

export default Footer;