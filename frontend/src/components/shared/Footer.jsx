"use client";
import { ChevronDown, Send } from "lucide-react";
import { Container } from "./Container";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#">About us</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Bookmarks</a></li>
              <li><a href="#">Sign in/Join</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Product Recalls</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Store Pickup</a></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policy</h4>
            <ul className="space-y-2">
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <p className="mb-2 leading-relaxed">
              House 23, Road 10, Sector 12, Uttara,<br />
              Dhaka 1230, Bangladesh
            </p>
            <p className="mb-2">support@bookwormbd.com</p>
            <p className="mb-4">+880 1711-123456</p>
            <div className="flex gap-4 text-gray-400">
              <a href="#"><i className="fab fa-instagram" /></a>
              <a href="#"><i className="fab fa-facebook" /></a>
              <a href="#"><i className="fab fa-youtube" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-pinterest" /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Join Our Newsletter</h4>
            <p className="mb-4">
              Signup to be the first to hear about exclusive deals, special offers, and new arrivals from Bangladesh
            </p>
            <div className="flex w-full rounded overflow-hidden">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 bg-white text-black placeholder-gray-500 outline-none"
              />
              <button className="bg-lime-500 px-4 flex items-center justify-center">
                <Send className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500">©2025 Book Worm BD. All rights reserved</p>
          <div className="flex gap-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm cursor-pointer">
              ENG <ChevronDown className="w-4 h-4" />
            </div>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm cursor-pointer">
              $ USD <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
