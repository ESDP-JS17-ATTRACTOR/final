import React from 'react';
import TeamCard from '@/components/Cards/TeamCard';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Team = () => {
  return (
    <div className="team-block">
      <div className="team-block_title">
        <h6>Our Team</h6>
      </div>
      <div className="team-block_swiper">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Navigation]}
            >
              <SwiperSlide>
                <TeamCard
                  image={'/team-erica.png'}
                  name={'Nino'}
                  info={
                    'With her extensive background in managing IT teams, she proudly succeeds in all her projects. She has a side\n' +
                    '            passion for writing fiction stories, playing guitar, singing, and traveling.'
                  }
                  position={'Project Manager'}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard
                  image={'/team-man.png'}
                  name={'Mark'}
                  info={
                    'Serial entrepreneur, innovator, an expert in Product Development, User Experience, and Design. Has successfully managed product teams for over a decade. Enjoys traveling and being in nature.'
                  }
                  position={'Founder, CEO'}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard
                  image={'/team-erica.png'}
                  name={'Erika'}
                  info={
                    'Serial entrepreneur, innovator, an expert in Product Development, User Experience, and Design. Has successfully managed product teams for over a decade. Enjoys traveling and being in nature.'
                  }
                  position={'Founder, CEO'}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard
                  image={'/team-man.png'}
                  name={'Nino'}
                  info={
                    'With her extensive background in managing IT teams, she proudly succeeds in all her projects. She has a side\n' +
                    '            passion for writing fiction stories, playing guitar, singing, and traveling.'
                  }
                  position={'Project Manager'}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard
                  image={'/team-erica.png'}
                  name={'Erika'}
                  info={
                    'Serial entrepreneur, innovator, an expert in Product Development, User Experience, and Design. Has successfully managed product teams for over a decade. Enjoys traveling and being in nature.'
                  }
                  position={'Founder, CEO'}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
