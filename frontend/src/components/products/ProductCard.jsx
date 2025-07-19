"use client";
import { Heart, ShoppingCart } from "lucide-react";

// Product Card Component
function ProductCard({ product }) {
  const { image, title, author, price, type, href } = product;

  return (
    <div className="bg-white h-full border border-gray-300 rounded-md  overflow-hidden group/edit hover:shadow-lg transition-shadow duration-300">
      <div className="overflow-hidden p-3 md:p-4 h-full">
        <div className="block relative">
          {/* Product Image */}
          <div className="flex justify-center py-5">
            <div className="block w-[120px] h-[183px]">
              <a href={href} className="block">
                <img
                  width="120"
                  height="183"
                  src={image}
                  alt={title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Product Body */}
          <div className="pt-3 bg-white group-hover/edit:-translate-y-10 transition-all duration-500">
            {/* Format/Type */}
            <div className="text-xs uppercase mb-1 text-[#FE0D0D] font-medium">
              <a href="#" className="hover:underline">
                {type}
              </a>
            </div>

            {/* Title - Fixed: Added proper text truncation */}
            <h2 className="text-sm font-medium mb-1 leading-tight text-gray-900 hover:text-gray-700">
              <a
                href={href}
                className="hover:underline block overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </a>
            </h2>

            {/* Author */}
            <div className="text-sm mb-1 text-gray-600">
              <a href="#" className="hover:underline">
                {author}
              </a>
            </div>

            {/* Price */}
            <div className="flex items-center font-medium text-sm text-gray-900 mb-3">
              <span className="price">
                <span className="font-medium">
                  <span className="mr-0.5">$</span>
                  {price}
                </span>
              </span>
            </div>
          </div>

          {/* Hover Actions - Fixed: Now only shows on individual card hover */}
          <div className="flex items-center opacity-0 m group-hover/edit:bottom-0 group-hover/edit:opacity-100 transition-all duration-500 absolute -bottom-32 left-0 right-0 bg-white/95 backdrop-blur-sm pt-3">
            <button
              className="text-xs uppercase text-[#1E2631] hover:text-white font-medium mr-auto flex items-center gap-1 hover:bg-gray-600  py-1 px-2  rounded transition-colors duration-200"
              aria-label={`Add to cart: "${title}"`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to cart</span>
            </button>

            <button
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 p-1"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
