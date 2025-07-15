"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import errorimage from "../../public/images/notfound/error.gif"; // Save your GIF here

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12 text-center">
      {/* Status Code */}
      <h1 className="text-8xl font-extrabold text-green-600 mb-4">404</h1>

      {/* Caveman Image */}
      <div className="w-[300px] md:w-[500px] mb-8">
        <Image
          src={errorimage}
          alt="Page not found"
          width={500}
          height={500}
          quality={100}
          className="mx-auto object-contain"
          priority
        />
      </div>

      {/* Message */}
      <div className="max-w-xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 mb-6 text-sm md:text-base">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-block bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
