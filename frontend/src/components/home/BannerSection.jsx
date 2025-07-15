"use client";
import Image from "next/image";
import { Container } from "../shared/Container";
import banner1 from "../../../public/images/banners/banner.png";
import banner2 from "../../../public/images/banners/banner2.png";
import banner3 from "../../../public/images/banners/banner3.png";

export default function BannerSection() {
  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row gap-4  py-10 bg-white">
          {/* Left Side Banner */}
          <div className="relative w-full border md:w-[887px] h-[590px] bg-gradient-to-r from-white to-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={banner1}
              alt="Book Banner"
              fill
              className="object-cover object-center"
            />
            <div className="absolute top-1/2 left-20 -translate-y-1/2 z-10 text-left">
              <p className="text-sm text-gray-500 font-semibold">
                AVAILABLE ONCE A YEAR
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mt-2">
                Get 40% off on <br />
                Orders over $149
              </h1>
              <button className="mt-6 px-6 py-3 bg-black text-white text-sm font-medium rounded">
                Explore Now
              </button>
            </div>

            {/* Left Arrow */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border rounded flex items-center justify-center bg-white shadow">
              <span className="text-lg">{"<"}</span>
            </button>

            {/* Right Arrow */}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border rounded flex items-center justify-center bg-white shadow">
              <span className="text-lg">{">"}</span>
            </button>
          </div>

          {/* Right Side Cards */}
          <div className="flex flex-col gap-4 w-full md:w-[435px] ">
            {/* Best Sellers Card */}
            <div className="bg-white border h-[287px] relative  ">
              <div className="relative w-full h-full  overflow-hidden">
                <Image
                  src={banner2}
                  alt="Recipe Book"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute left-5 top-5">
                <h3 className="text-lg font-bold">Best Sellers</h3>
                <p className="text-md font-medium text-gray-700">Books</p>
                <span className="text-lime-600 font-semibold">PURCHASE</span>
              </div>
            </div>
{/* 
            <div className="bg-white h-[287px] border shadow-md p-4 relative flex flex-col gap-2">
              <div className="absolute right-2 top-2">
                <div className="relative w-24 h-24">
                  <Image
                    src={banner2}
                    alt="Book"
                    fill
                    className="object-cover rounded"
                  />
                  <div className="absolute top-0 right-0 bg-lime-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    21% OFF
                  </div>
                </div>
              </div>
            </div> */}

            {/* Featured Book Card */}
            <div className="bg-white border h-[287px] relative  ">
              <div className="relative w-full h-full  overflow-hidden">
                <Image
                  src={banner3}
                  alt="Recipe Book"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute left-5 top-5">
                <h3 className="text-lg font-bold">
                  Featured Book <br />
                  <span className="font-normal">of the month</span>
                </h3>
                <span className="text-lime-600 font-semibold">PURCHASE</span>
              </div>
            </div>
          </div>
        </div>{" "}
      </Container>
    </div>
  );
}
