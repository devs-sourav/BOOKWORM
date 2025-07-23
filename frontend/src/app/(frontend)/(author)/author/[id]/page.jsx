"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Award,
  Users,
  Star,
  ExternalLink,
  Mail,
  Twitter,
  Globe,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";

export default function AuthorPage() {
  const params = useParams();
  const { id } = params;
  const [activeTab, setActiveTab] = useState("biography");

  // Mock author data - replace with actual API call
  const authorData = {
    name: "Alexandra Mitchell",
    title: "Bestselling Author & Literary Critic",
    image: "/images/author/1.jpg",
    bio: "Alexandra Mitchell is a renowned contemporary fiction writer whose works explore the intricate relationships between technology and human connection in the modern world. With over two decades of writing experience, she has captivated readers globally with her thought-provoking narratives and compelling character development.",
    birthDate: "March 15, 1978",
    nationality: "American",
    education: "MFA in Creative Writing, Columbia University",
    awards: [
      "Pulitzer Prize Finalist 2022",
      "National Book Award 2019",
      "PEN/Faulkner Award 2018",
    ],
    genres: ["Contemporary Fiction", "Literary Fiction", "Science Fiction"],
    totalBooks: 12,
    totalSales: "2.5M+",
    languages: 28,
    website: "www.alexandramitchell.com",
    email: "contact@alexandramitchell.com",
    twitter: "@AlexMitchellAuthor",
    books: [
      {
        id: 1,
        title: "Digital Hearts",
        year: 2023,
        genre: "Contemporary Fiction",
        rating: 4.8,
        reviews: 1234,
        description:
          "A profound exploration of love in the digital age, examining how technology shapes our most intimate relationships.",
        cover:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
        price: 24.99,
      },
      {
        id: 2,
        title: "The Last Library",
        year: 2021,
        genre: "Literary Fiction",
        rating: 4.9,
        reviews: 2156,
        description:
          "A haunting tale of preservation and memory in a world where physical books are becoming extinct.",
        cover:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
        price: 22.5,
      },
      {
        id: 3,
        title: "Echoes of Tomorrow",
        year: 2019,
        genre: "Science Fiction",
        rating: 4.7,
        reviews: 1876,
        description:
          "A thought-provoking journey through parallel dimensions where every choice creates a new reality.",
        cover:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
        price: 26.99,
      },
      {
        id: 4,
        title: "Midnight Conversations",
        year: 2018,
        genre: "Contemporary Fiction",
        rating: 4.6,
        reviews: 1543,
        description:
          "An intimate collection of interconnected stories about strangers who find connection in unexpected places.",
        cover:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=300&fit=crop",
        price: 21.75,
      },
      {
        id: 5,
        title: "Silicon Dreams",
        year: 2020,
        genre: "Science Fiction",
        rating: 4.5,
        reviews: 1687,
        description:
          "A gripping tale of artificial intelligence and what it means to be human in an increasingly digital world.",
        cover:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop",
        price: 23.99,
      },
      {
        id: 6,
        title: "Urban Legends",
        year: 2017,
        genre: "Contemporary Fiction",
        rating: 4.4,
        reviews: 1323,
        description:
          "Stories that blur the line between myth and reality in the heart of modern metropolitan life.",
        cover:
          "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=200&h=300&fit=crop",
        price: 20.99,
      },
    ],
  };

  // Transform books data for ProductCard component
  const transformedBooks = authorData.books.map((book) => ({
    image: book.cover,
    title: book.title,
    author: authorData.name,
    price: book.price,
    type: book.genre,
    href: `/book/${book.id}`,
  }));

  const tabs = [
    { id: "biography", label: "Biography", icon: Users },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "awards", label: "Awards & Recognition", icon: Award },
  ];

  return (
    <div className=" bg-gray-100 ">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b mt-10">
        <Container>
          <div className="  py-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="flex-shrink-0">
                <img
                  src={authorData.image}
                  alt={authorData.name}
                  className="w-48 h-48 rounded-full object-cover shadow-lg ring-4 ring-blue-100"
                />
              </div>

              <div className="text-center lg:text-left flex-grow">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {authorData.name}
                </h1>
                <p className="text-xl text-blue-600 mb-4">{authorData.title}</p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl">
                  {authorData.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {authorData.totalBooks}
                    </div>
                    <div className="text-sm text-gray-500">Published Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {authorData.totalSales}
                    </div>
                    <div className="text-sm text-gray-500">Copies Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {authorData.languages}
                    </div>
                    <div className="text-sm text-gray-500">Languages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {authorData.awards.length}
                    </div>
                    <div className="text-sm text-gray-500">Major Awards</div>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href={`https://${authorData.website}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                  <a
                    href={`mailto:${authorData.email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                  <a
                    href={`https://twitter.com/${authorData.twitter.replace(
                      "@",
                      ""
                    )}`}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        
        <Container>
          <div className=" ">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        {/* Content */}
        <div className="mx-auto py-8">
          {activeTab === "biography" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    About {authorData.name}
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Born in the heart of literary America, Alexandra Mitchell
                      discovered her passion for storytelling at an early age.
                      Her journey began with short stories published in local
                      magazines during her college years, eventually leading to
                      her breakthrough novel that established her as a
                      distinctive voice in contemporary literature.
                    </p>
                    <p>
                      Mitchell's work is characterized by its deep psychological
                      insight and innovative narrative techniques. She has been
                      praised by critics for her ability to weave complex themes
                      of identity, technology, and human connection into
                      compelling stories that resonate with readers across
                      generations.
                    </p>
                    <p>
                      When not writing, Alexandra teaches creative writing
                      workshops and serves as a mentor to emerging authors. She
                      believes in the power of literature to bridge cultural
                      divides and create meaningful dialogue about the
                      challenges of modern life.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Born: {authorData.birthDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Nationality: {authorData.nationality}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Education: {authorData.education}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {authorData.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Published Works
                </h2>
                <div className="text-sm text-gray-500">
                  {authorData.books.length} books published
                </div>
              </div>

              {/* Using ProductCard component for books */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {transformedBooks.map((book, index) => (
                  <ProductCard key={index} product={book} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "awards" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Awards & Recognition
              </h2>

              <div className="grid gap-6">
                {authorData.awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {award}
                      </h3>
                      <p className="text-gray-600">
                        Recognized for outstanding contribution to contemporary
                        literature
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Critical Acclaim
                  </h3>
                  <p className="text-gray-600 mb-4">
                    "Mitchell's work represents the finest in contemporary
                    American fiction, combining masterful storytelling with
                    profound insights into the human condition." - The New York
                    Times
                  </p>
                  <p className="text-gray-600">
                    Her novels have been translated into 28 languages and have
                    sold over 2.5 million copies worldwide, establishing her as
                    one of the most influential voices of her generation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
