"use client";

import { useRef } from "react";
import BlogCard from "../blog/BlogCard";
import { Container } from "../shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";

const articles = [
  {
    id: 1,
    image: "/images/blog/1.jpg",
    date: "19 Aug, 2020",
    comments: "2 Comments",
    title: "Benefits of Reading: Getting Smart, Thin, Healthy, Happy",
  },
  {
    id: 2,
    image: "/images/blog/2.jpg",
    date: "19 Aug, 2020",
    comments: "2 Comments",
    title: "Anne Bogel’s 5 Tips to Restore Your Love of Reading",
  },
  {
    id: 3,
    image: "/images/blog/3.jpg",
    date: "19 Aug, 2020",
    comments: "",
    title: "'American Dirt' Invites Readers into the Journey of Mexico...",
  },
  {
    id: 4,
    image: "/images/blog/1.jpg",
    date: "20 Aug, 2020",
    comments: "3 Comments",
    title: "How Reading Fiction Helps Boost Your Imagination",
  },
];

export default function LatestNews() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <section className="pb-20 pt-10 bg-white">
      <Container>
        <div className="flex justify-between group items-center mb-12 border-b pb-6 border-gray-100">
          <h2 className="text-3xl font-medium">Latest News</h2>
          <a href="#" className="text-base text-gray-500 hover:text-black">
            View All &gt;
          </a>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}    
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <BlogCard
                  image={article.image}
                  date={article.date}
                  comments={article.comments}
                  title={article.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Circular Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110  z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-lg  transition-transform transform hover:scale-110 z-20 "
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </Container>
    </section>
  );
}
