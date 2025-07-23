"use client";

import { useState } from "react";
import AuthorSection from "./AuthorSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedBooksSection from "./FeaturedBooksSection";
import FormatSection from "./FormatSection";
import ReviewSection from "./ReviewSection";
import SidebarSection from "./SidebarSection";
import PriceFilterSection from "./PriceFilterSection";

const BookstoreSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    featured: true,
    categories: false,
    authors: false,
    formats: false,
    price: false,
    reviews: false,
  });

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <div className="w-full bg-white rounded-lg  h-fit border border-gray-300">
      {/* <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Filter Books</h2>
        <div className="w-12 h-1 bg-blue-600 rounded"></div>
      </div> */}

      <div className="space-y-1 divide-y divide-gray-300">
        <SidebarSection
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection("categories")}
        >
          <CategoriesSection />
        </SidebarSection>

        <SidebarSection
          title="Authors"
          isExpanded={expandedSections.authors}
          onToggle={() => toggleSection("authors")}
        >
          <AuthorSection />
        </SidebarSection>

        <SidebarSection
          title="Format"
          isExpanded={expandedSections.formats}
          onToggle={() => toggleSection("formats")}
        >
          <FormatSection />
        </SidebarSection>

        <SidebarSection
          title="Price Filter"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection("price")}
        >
          <PriceFilterSection />
        </SidebarSection>

        <SidebarSection
          title="Customer Reviews"
          isExpanded={expandedSections.reviews}
          onToggle={() => toggleSection("reviews")}
        >
          <ReviewSection />
        </SidebarSection>

        <SidebarSection
          title="Featured Books"
          isExpanded={expandedSections.featured}
          onToggle={() => toggleSection("featured")}
        >
          <FeaturedBooksSection />
        </SidebarSection>
      </div>

      <div className="  border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-3 px-4 font-medium hover:bg-blue-700 transition-colors">
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default BookstoreSidebar;
