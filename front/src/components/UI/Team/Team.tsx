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
                <TeamCard />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard />
              </SwiperSlide>
              <SwiperSlide>
                <TeamCard />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
