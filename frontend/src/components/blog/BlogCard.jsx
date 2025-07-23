"use client";
import Image from "next/image";

export default function BlogCard({ image, date, comments, title }) {
  return (
    <div className="group">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-sm text-gray-500 mt-2 flex gap-4">
        <span>{date}</span>
        {comments && <span>{comments}</span>}
      </div>
      <h3 className="text-sm text-black mt-1 font-medium leading-snug">{title}</h3>
    </div>
  );
}
