import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Article = () => {
  return (
    <div className="article">
      <div className="article-left-side">
        <Image src="/workingGirl.png" alt="Image" width={247} height={195} />
      </div>
      <div className="article-right-side">
        <div className="article-right-side-titles">
          <h2>
            What is <span>online course</span>
          </h2>
        </div>
        <div className="article-right-side-description">
          <p>
            We will help you learn the current profession and start a career. Become a specialist in the promotion of
            goods, services and brands on the Internet. Learn to research the market, develop a product idea, launch
            advertising campaigns and analyze their results. Master web analytics services in practice, learn how to
            build a customer journey map, conduct UX research and present their results to the customer. You can start
            without experience, and find your first job within 6 months after the start of training.
          </p>
        </div>
        <div className="article-right-side-btn">
          <Link href="/about">
            <button>Tell me more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
