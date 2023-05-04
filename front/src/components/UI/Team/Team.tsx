import React, { useRef } from "react";
import TeamCard from "@/components/Cards/TeamCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

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
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              breakpoints={{860: {slidesPerView: 3, navigation: true}}}
            >
              <SwiperSlide><TeamCard /></SwiperSlide>
              <SwiperSlide><TeamCard /></SwiperSlide>
              <SwiperSlide><TeamCard /></SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
