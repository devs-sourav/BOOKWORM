"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo/logowhite.png";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const pathname = usePathname();

  // Navigation items with their respective paths
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Author", path: "/author" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/about" }
  ];

  // Function to check if a nav item is active
  const isActiveNavItem = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div>
      <div className="bg-[#252F3D] text-white">
        <Container>
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            {/* Left: Menu + Logo */}
            <div className="flex items-center space-x-4">
              <Menu className="w-7 h-7 mt-3" />
              <Link href="/" className="flex items-center text-2xl font-bold">
                <Image
                  src={logo}
                  alt="worm"
                  width={202}
                  height={32}
                  className="mx-1"
                />
              </Link>
            </div>
            {/* Right: Search + Account + Cart */}
            <div className="flex items-center space-x-6">
              {/* Search */}
              <div
                ref={searchRef}
                className="relative transition-all duration-300"
              >
                <div
                  className={`flex items-center bg-white rounded px-2 py-1.5 cursor-pointer ${
                    isSearchOpen ? "w-[400px]" : "w-10"
                  } transition-all duration-300 ease-in-out`}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-6 h-6 text-black" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`ml-2 text-black outline-none bg-transparent w-full ${
                      isSearchOpen ? "block" : "hidden"
                    }`}
                    autoFocus={isSearchOpen}
                  />
                </div>
              </div>
              {/* Account */}
              <div className="flex items-center space-x-1">
                <User className="w-5 h-5" />
                <div>
                  <p className="text-sm">Sign In</p>
                  <p className="text-md font-semibold">My Account</p>
                </div>
              </div>
              {/* Cart */}
              <div className="flex items-center space-x-1 relative">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -left-2 text-xs bg-white text-black rounded-full px-[5px]">
                    0
                  </span>
                </div>
                <div>
                  <p className="text-sm">My Cart</p>
                  <p className="text-md font-semibold">$ 0.00</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* Bottom Nav */}
        <div className="bg-[#1E2631] py-2 text-sm">
          <Container>
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`transition-colors duration-200 hover:text-red-400 ${
                    isActiveNavItem(item.path)
                      ? "text-red-500 font-semibold"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};