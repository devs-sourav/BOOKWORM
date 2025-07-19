"use client";
import Image from "next/image";
import { Container } from "../shared/Container";

export default function AdsBanner() {
  return (
    <div className="pb-24 pt-12">
      <Container>
        <div className="bg-[#2b3342] rounded-lg px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl">
            <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-2">
              Available once a year
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
              Get special off on orders over{" "}
              <span className="whitespace-nowrap">$139</span>
            </h2>
            <button className="bg-[#94d34d] text-white font-medium px-6 py-3 rounded-md hover:bg-[#80ba40] transition">
              Explore Books
            </button>
          </div>

          {/* Book Images */}
          <div className="flex items-end justify-end gap-[-20px] relative w-full md:w-auto">
            <Image
              src="/images/products/1.jpg"
              alt="Book 1"
              width={110}
              height={160}
              className="relative z-10"
            />
            <Image
              src="/images/products/2.jpg"
              alt="Book 2"
              width={110}
              height={160}
              className="relative z-20 -ml-6"
            />
            <Image
              src="/images/products/3.jpg"
              alt="Book 3"
              width={110}
              height={160}
              className="relative z-30 -ml-6"
            />
            <Image
              src="/images/products/4.jpg"
              alt="Book 4"
              width={110}
              height={160}
              className="relative z-40 -ml-6"
            />
            <Image
              src="/images/products/5.jpg"
              alt="Book 5"
              width={110}
              height={160}
              className="relative z-50 -ml-6"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
