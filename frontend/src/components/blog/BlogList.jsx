"use client";

import { useState } from "react";
import { Container } from "../shared/Container";
import BlogCard from "./BlogCard";

const articles = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    date: "19 Aug, 2020",
    comments: "2 Comments",
    title: "Benefits of Reading: Getting Smart, Thin, Healthy, Happy",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    date: "19 Aug, 2020",
    comments: "5 Comments",
    title: "Anne Bogel’s 5 Tips to Restore Your Love of Reading",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    date: "20 Aug, 2020",
    comments: "1 Comment",
    title: "'American Dirt' Invites Readers into the Journey of Mexico...",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    date: "21 Aug, 2020",
    comments: "3 Comments",
    title: "How Reading Fiction Helps Boost Your Imagination",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1473755504818-b72b9c0b745f?auto=format&fit=crop&w=800&q=80",
    date: "22 Aug, 2020",
    comments: "4 Comments",
    title: "The Science Behind Reading and Brain Health",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1486308510493-cb2528fd4d23?auto=format&fit=crop&w=800&q=80",
    date: "23 Aug, 2020",
    comments: "2 Comments",
    title: "Creating a Daily Reading Habit: Tips & Tricks",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1528731708534-816fe59f90a0?auto=format&fit=crop&w=800&q=80",
    date: "24 Aug, 2020",
    comments: "6 Comments",
    title: "Top 10 Fiction Books to Read This Year",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    date: "25 Aug, 2020",
    comments: "3 Comments",
    title: "How Audiobooks Can Change Your Reading Experience",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80",
    date: "26 Aug, 2020",
    comments: "1 Comment",
    title: "Why Reading Diverse Authors Matters",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    date: "27 Aug, 2020",
    comments: "5 Comments",
    title: "Setting Up Your Perfect Reading Nook",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    date: "28 Aug, 2020",
    comments: "4 Comments",
    title: "How to Pick Books That Actually Interest You",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1486942076184-c3c44052ee68?auto=format&fit=crop&w=800&q=80",
    date: "29 Aug, 2020",
    comments: "2 Comments",
    title: "Exploring the World Through Travel Literature",
  },
];


export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on the search term (case-insensitive)
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="pb-20 pt-10 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-6 border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Latest News
          </h2>

          {/* Search box */}
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Display cards in a responsive grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {filteredArticles.map((article) => (
              <BlogCard
                key={article.id}
                id={article.id}
                image={article.image}
                date={article.date}
                comments={article.comments}
                title={article.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-12">
            No articles found for &quot;{searchTerm}&quot;.
          </p>
        )}
      </Container>
    </section>
  );
}
