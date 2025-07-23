"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Lightbox imports
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageGallery = ({ images }) => {
  const [index, setIndex] = useState(-1); // -1 means lightbox closed

  // Format images for lightbox (expects { src: string })
  const slides = images.map((src) => ({ src }));

  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Book image ${i + 1}`}
              className="w-full h-auto object-cover rounded-xl cursor-pointer"
              onClick={() => setIndex(i)} // open lightbox on click
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
};

export default ImageGallery;
