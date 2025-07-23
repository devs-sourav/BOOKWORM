"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../products/ProductCard";

// Dummy Product List (replace this with your actual product import or props)

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=183&fit=crop",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "12.99",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=183&fit=crop",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "14.50",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=120&h=183&fit=crop",
    title: "1984",
    author: "George Orwell",
    price: "13.25",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=183&fit=crop",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: "16.99",
    type: "Science",
    href: "/product-details"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=183&fit=crop",
    title: "The Art of War",
    author: "Sun Tzu",
    price: "9.99",
    type: "Philosophy",
    href: "/product-details"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=120&h=183&fit=crop",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: "11.75",
    type: "Romance",
    href: "/product-details"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=120&h=183&fit=crop",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: "13.50",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?w=120&h=183&fit=crop",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: "18.99",
    type: "History",
    href: "/product-details"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&h=183&fit=crop",
    title: "Becoming",
    author: "Michelle Obama",
    price: "17.99",
    type: "Biography",
    href: "/product-details"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=120&h=183&fit=crop",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: "10.50",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=183&fit=crop",
    title: "Atomic Habits",
    author: "James Clear",
    price: "15.99",
    type: "Self-Help",
    href: "/product-details"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=120&h=183&fit=crop",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: "11.99",
    type: "Business",
    href: "/product-details"
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?w=120&h=183&fit=crop",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: "13.95",
    type: "Spirituality",
    href: "/product-details"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&h=183&fit=crop",
    title: "Educated",
    author: "Tara Westover",
    price: "14.20",
    type: "Memoir",
    href: "/product-details"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1563201515-174a665faaa6?w=120&h=183&fit=crop",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: "12.80",
    type: "Self-Help",
    href: "/product-details"
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=120&h=183&fit=crop",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: "13.45",
    type: "Fantasy",
    href: "/product-details"
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1588776814546-0e9730f9b063?w=120&h=183&fit=crop",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: "14.99",
    type: "Fantasy",
    href: "/product-details"
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&h=183&fit=crop",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "11.50",
    type: "Finance",
    href: "/product-details"
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1586972211666-3cdf3a9edb6a?w=120&h=183&fit=crop",
    title: "The Lean Startup",
    author: "Eric Ries",
    price: "13.80",
    type: "Business",
    href: "/product-details"
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=183&fit=crop",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "15.20",
    type: "Finance",
    href: "/product-details"
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&h=183&fit=crop",
    title: "Outliers",
    author: "Malcolm Gladwell",
    price: "13.30",
    type: "Psychology",
    href: "/product-details"
  },
  {
    id: 22,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&h=183&fit=crop",
    title: "Born a Crime",
    author: "Trevor Noah",
    price: "16.40",
    type: "Memoir",
    href: "/product-details"
  },
  {
    id: 23,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=120&h=183&fit=crop",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    price: "10.80",
    type: "Romance",
    href: "/product-details"
  },
  {
    id: 24,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=183&fit=crop",
    title: "Meditations",
    author: "Marcus Aurelius",
    price: "9.45",
    type: "Philosophy",
    href: "/product-details"
  },
    {
    id: 25,
    image: "https://images.unsplash.com/photo-1496104679561-38f39d54c6a9?w=120&h=183&fit=crop",
    title: "The Road",
    author: "Cormac McCarthy",
    price: "14.00",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 26,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=183&fit=crop",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: "16.50",
    type: "Psychology",
    href: "/product-details"
  },
  {
    id: 27,
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=120&h=183&fit=crop",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    price: "12.75",
    type: "Thriller",
    href: "/product-details"
  },
  {
    id: 28,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=120&h=183&fit=crop",
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    price: "14.25",
    type: "Dystopian",
    href: "/product-details"
  },
  {
    id: 29,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=183&fit=crop",
    title: "Brief Answers to the Big Questions",
    author: "Stephen Hawking",
    price: "17.00",
    type: "Science",
    href: "/product-details"
  },
  {
    id: 30,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=183&fit=crop",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "13.99",
    type: "Thriller",
    href: "/product-details"
  },
  {
    id: 31,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&h=183&fit=crop",
    title: "Educated",
    author: "Tara Westover",
    price: "14.20",
    type: "Memoir",
    href: "/product-details"
  },
  {
    id: 32,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&h=183&fit=crop",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: "15.40",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 33,
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=120&h=183&fit=crop",
    title: "Grit",
    author: "Angela Duckworth",
    price: "12.60",
    type: "Self-Help",
    href: "/product-details"
  },
  {
    id: 34,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=120&h=183&fit=crop",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "13.50",
    type: "Self-Help",
    href: "/product-details"
  },
  {
    id: 35,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=183&fit=crop",
    title: "The Outsiders",
    author: "S.E. Hinton",
    price: "10.00",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 36,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&h=183&fit=crop",
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    price: "11.25",
    type: "Spirituality",
    href: "/product-details"
  },
  {
    id: 37,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&h=183&fit=crop",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    price: "14.99",
    type: "Psychology",
    href: "/product-details"
  },
  {
    id: 38,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=183&fit=crop",
    title: "Meditations",
    author: "Marcus Aurelius",
    price: "9.45",
    type: "Philosophy",
    href: "/product-details"
  },
  {
    id: 39,
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=120&h=183&fit=crop",
    title: "Dune",
    author: "Frank Herbert",
    price: "16.80",
    type: "Science Fiction",
    href: "/product-details"
  },
  {
    id: 40,
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=120&h=183&fit=crop",
    title: "The Martian",
    author: "Andy Weir",
    price: "15.99",
    type: "Science Fiction",
    href: "/product-details"
  },
  {
    id: 41,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=120&h=183&fit=crop",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    price: "13.50",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 42,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&h=183&fit=crop",
    title: "The Art of Happiness",
    author: "Dalai Lama",
    price: "14.60",
    type: "Self-Help",
    href: "/product-details"
  },
  {
    id: 43,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&h=183&fit=crop",
    title: "Zero to One",
    author: "Peter Thiel",
    price: "13.75",
    type: "Business",
    href: "/product-details"
  },
  {
    id: 44,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=120&h=183&fit=crop",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: "13.50",
    type: "Fiction",
    href: "/product-details"
  },
  {
    id: 45,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=183&fit=crop",
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    price: "12.95",
    type: "Fiction",
    href: "/product-details"
  }
];
function ShopGridList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [visibleCount, setVisibleCount] = useState(8);

  // Get unique categories from products
  const categories = useMemo(() => {
    const types = [...new Set(products.map(product => product.type))];
    return ["all", ...types];
  }, []);

  // Filtered and sorted products (all, before slicing)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Sort and slice the visible products
  const filteredAndSortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "author":
          return a.author.localeCompare(b.author);
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return sorted.slice(0, visibleCount);
  }, [filteredProducts, sortBy, visibleCount]);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Our Collection</h1>
        <p className="text-gray-600">Discover our curated selection of books across various genres</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search books, authors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(20); // Reset on search
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category & Sort */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleCount(20); // Reset on category change
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Result Count */}
          <div className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredAndSortedProducts.length < filteredProducts.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopGridList;
