"use client";

import { useState } from "react";
import Image from "next/image";
import bg from "../../../../../public/images/auth/Picture.png";
import logo from "../../../../../public/images/logo/logo.png";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Login Form */}

      <div className="w-full md:w-1/2 relative hidden md:block">
        <Image src={bg} alt="Bookstore" fill className="object-cover" />
      </div>
      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-4 sm:px-8 md:px-16 py-10">
        <div className="w-full max-w-md ">
          <Link className="w-full flex justify-center" href="/">
            <div className="max-w-[260px] mb-10">
              <Image src={logo} alt="logo" quality={100} />
            </div>
          </Link>

          <p className="text-gray-500 mt-4 mb-5 text-center">Welcome here!</p>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Register to your account
          </h2>
          <form className="w-full">
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="name"
              placeholder="John Doe"
              className="w-full p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <label className="block text-sm text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="john@mail.com"
              className="w-full p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              defaultValue="General"
              className="w-full p-3 mb-4 border cursor-pointer border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="General">General</option>
              <option value="Author">Author</option>
            </select>

            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pr-10 mb-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 accent-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-blue-600">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>

            <Link href="/login" className="block mt-5">
              <button
                type="button"
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
              >
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
