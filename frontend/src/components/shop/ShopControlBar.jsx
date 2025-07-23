"use client";

import { useState } from "react";
import Link from "next/link";

// SVG ICON: Grid View
const GridIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor">
    {[0, 7, 14].flatMap((y) =>
      [0, 7, 14].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />
      ))
    )}
  </svg>
);

// SVG ICON: List View
const ListIcon = () => (
  <svg width="23" height="17" viewBox="0 0 23 17" fill="currentColor">
    {[0, 7, 14].map((y, i) => (
      <g key={i}>
        <rect x="0" y={y} width="3" height="3" />
        <rect x="7" y={y} width="16" height="3" />
      </g>
    ))}
  </svg>
);

// MAIN COMPONENT
const ShopControlBar = () => {
  const [sort, setSort] = useState("menu_order");
  const [itemsPerPage, setItemsPerPage] = useState("20");

  return (
    <div className="shop-control-bar flex flex-col lg:flex-row justify-between items-center mb-5 text-center lg:text-left">
      {/* Left: Result count */}
      <div className="shop-control-bar__left mb-4 lg:mb-0">
        <p className="text-gray-700">Showing 1–12 of 89 results</p>
      </div>

      {/* Right */}
      <div className="shop-control-bar__right flex flex-col md:flex-row items-center gap-4">
        {/* Sort By Dropdown */}
        <form method="get">
          <select
            name="orderby"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-b  cursor-pointer border-gray-300 rounded px-3 py-2 "
          >
            <option value="menu_order">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option>
            <option value="date">Sort by latest</option>
            <option value="price">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
          </select>
        </form>

        {/* Items Per Page Dropdown */}
        <form method="POST" className="hidden xl:block">
          <select
            name="ppp"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="border-b border-gray-300 rounded px-3  cursor-pointer py-2 "
          >
            <option value="20">Show 20</option>
            <option value="40">Show 40</option>
            <option value="80">Show 80</option>
            <option value="-1">Show All</option>
          </select>
        </form>

        {/* View Switcher */}
        <div className="flex items-center space-x-3">
          <div
            
            className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            <GridIcon />
          </div>
          <div
            
            className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            <ListIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopControlBar;
