"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Plus, Minus, Heart } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import BookList from "./BookList";
import { Container } from "../shared/Container";
import RelatedProducts from "./RelatedProducts";
import ImageGallery from "./ImageGallery";
import EnhancedPDFModal from "./EnhancedPDFModal";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [isReading, setIsReading] = useState(false);
  const isPremium = false; // Your user logic here

  const pdfData = {
    title: "All You Can Ever Know: A Memoir",
    pdfUrl:
      "https://www.banglabookshelf.com/Story%20Books/Humayun%20Ahmed/Miscellaneous/Rupa%20by%20Humayun%20Ahmed.pdf",
  };
  const images = ["/images/products/1.jpg", "/images/products/2.jpg"];

  const handleBookmark = (bookmark) => {
    console.log("Bookmarked:", bookmark);
    // Add your bookmark logic here
  };

  const handleDownload = (url, title) => {
    console.log("Download:", title, url);
    // Add your download logic here
    window.open(url, "_blank");
  };

  return (
    <div>
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-20">
          {/* Image Gallery */}
          <div className="md:col-span-3">
            <ImageGallery images={images} />
          </div>

          {/* Product Summary */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All You Can Ever Know: A Memoir
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                By <span className="font-medium text-black">J. D. Robb</span>
              </p>
            </div>

            <p className="text-2xl font-semibold text-green-600">$14.20</p>

            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.
            </p>

            {!isPremium && (
              <button
                onClick={() => setIsReading(true)}
                className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
              >
                Read Book
              </button>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-12">
              <div className="flex items-center border h-12 border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 1) {
                      setQuantity(value);
                    }
                  }}
                  className="w-14 text-center border-x border-gray-300 outline-none"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="bg-black text-white px-6 py-2 h-12 flex-1 rounded hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>

            {/* Wishlist and Social Share */}
            <div className="flex items-center gap-6 text-sm mt-4">
              <button className="flex items-center gap-1 text-red-600 hover:underline font-medium">
                <Heart size={16} /> Add to Wishlist
              </button>
              <div className="flex gap-3 text-gray-500">
                <a href="#" className="hover:text-blue-600">
                  Facebook
                </a>
                <a href="#" className="hover:text-sky-500">
                  Twitter
                </a>
                <a href="#" className="hover:text-red-500">
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced PDF Modal */}
          {isReading && (
            <EnhancedPDFModal
              pdfUrl={pdfData.pdfUrl}
              title={pdfData.title}
              isPremium={isPremium}
              onClose={() => setIsReading(false)}
              maxPages={10}
              bookId="book-123"
              onBookmark={handleBookmark}
              onDownload={handleDownload}
            />
          )}

          {/* Book List on Side */}
          <div className="md:col-span-3 space-y-6">
            <BookList />
          </div>

          {/* Tabs */}
          <div className="col-span-12 mt-8">
            <div className="flex gap-8 border-b border-gray-200 pb-2">
              {["description", "details", "videos"].map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`capitalize text-md pb-2 transition font-medium ${
                    tab === key
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="mt-6 text-gray-700">
              {tab === "description" && (
                <div className="space-y-2 leading-relaxed">
                  <p>
                    <strong>#1 New York Times Bestseller</strong>
                  </p>
                  <p>"Painfully beautiful." – The New York Times</p>
                  <p>
                    Perfect for fans of Barbara Kingsolver and memoir lovers
                    alike...
                  </p>
                </div>
              )}

              {tab === "details" && (
                <ul className="space-y-2">
                  <li>
                    <strong>Author:</strong> J. D. Robb
                  </li>
                  <li>
                    <strong>Format:</strong> Hardcover
                  </li>
                  <li>
                    <strong>Categories:</strong> Mystery, Thriller & Suspense
                  </li>
                  <li>
                    <strong>SKU:</strong> BW-1003018-1
                  </li>
                </ul>
              )}

              {tab === "videos" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <iframe
                    src="https://www.youtube.com/embed/wloL7fwmojg?si=QOHpuJO_gLqaQXNy"
                    className="w-full aspect-video rounded-lg shadow-sm"
                    allowFullScreen
                  ></iframe>
                  <iframe
                    src="https://www.youtube.com/embed/Q_XAX08b5Vc?si=4Xmn49ncXZS286I0"
                    className="w-full aspect-video rounded-lg shadow-sm"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 mt-8">
            <RelatedProducts />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
