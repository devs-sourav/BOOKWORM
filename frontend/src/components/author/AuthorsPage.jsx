"use client";

import Link from "next/link";
import { useState } from "react";

// Sample data
const sampleAuthors = [
  {
    id: 1,
    name: "A G Riddle",
    slug: "a-g-riddle",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 3,
  },
  {
    id: 2,
    name: "Andre Aciman",
    slug: "andre-aciman",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328fddb5?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 2,
  },
  {
    id: 3,
    name: "Colin O'Brady",
    slug: "colin-obrady",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 0,
  },
  {
    id: 4,
    name: "Bella Forrest",
    slug: "bella-forrest",
    image:
      "https://images.unsplash.com/photo-1552058544-5c9f5fe3b1af?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 12,
  },
  {
    id: 5,
    name: "Brandon Sanderson",
    slug: "brandon-sanderson",
    image:
      "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 15,
  },
  {
    id: 6,
    name: "Cassandra Clare",
    slug: "cassandra-clare",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 10,
  },
  {
    id: 7,
    name: "Dan Brown",
    slug: "dan-brown",
    image:
      "https://images.unsplash.com/photo-1552058544-8465c729e7a0?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 7,
  },
  {
    id: 8,
    name: "Daphne du Maurier",
    slug: "daphne-du-maurier",
    image:
      "https://images.unsplash.com/photo-1522199778947-0c7f1b5f32a6?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 9,
  },
  {
    id: 9,
    name: "E. Lockhart",
    slug: "e-lockhart",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 4,
  },
  {
    id: 10,
    name: "Emily Henry",
    slug: "emily-henry",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 6,
  },
  {
    id: 11,
    name: "Fiona Barton",
    slug: "fiona-barton",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 3,
  },
  {
    id: 12,
    name: "Gillian Flynn",
    slug: "gillian-flynn",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 5,
  },
  {
    id: 13,
    name: "Harlan Coben",
    slug: "harlan-coben",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 13,
  },
  {
    id: 14,
    name: "Haruki Murakami",
    slug: "haruki-murakami",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 11,
  },
  {
    id: 15,
    name: "Isaac Asimov",
    slug: "isaac-asimov",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 25,
  },
  {
    id: 16,
    name: "J.K. Rowling",
    slug: "jk-rowling",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 14,
  },
  {
    id: 17,
    name: "James Patterson",
    slug: "james-patterson",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 20,
  },
  {
    id: 18,
    name: "Jane Austen",
    slug: "jane-austen",
    image:
      "https://images.unsplash.com/photo-1502720705749-3c045fa5d5da?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 8,
  },
  {
    id: 19,
    name: "Jojo Moyes",
    slug: "jojo-moyes",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 5,
  },
  {
    id: 20,
    name: "John Green",
    slug: "john-green",
    image:
      "https://images.unsplash.com/photo-1546456073-6712f79251bb?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 6,
  },
  {
    id: 21,
    name: "Khaled Hosseini",
    slug: "khaled-hosseini",
    image:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 3,
  },
  {
    id: 22,
    name: "Kristin Hannah",
    slug: "kristin-hannah",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 9,
  },
  {
    id: 23,
    name: "Lisa Jewell",
    slug: "lisa-jewell",
    image:
      "https://images.unsplash.com/photo-1554384645-13eab165c24b?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 6,
  },
  {
    id: 24,
    name: "Margaret Atwood",
    slug: "margaret-atwood",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 17,
  },
  {
    id: 25,
    name: "Neil Gaiman",
    slug: "neil-gaiman",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 12,
  },
  {
    id: 26,
    name: "Nora Roberts",
    slug: "nora-roberts",
    image:
      "https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 18,
  },
  {
    id: 27,
    name: "Paulo Coelho",
    slug: "paulo-coelho",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 11,
  },
  {
    id: 28,
    name: "Rainbow Rowell",
    slug: "rainbow-rowell",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 4,
  },
  {
    id: 29,
    name: "Rick Riordan",
    slug: "rick-riordan",
    image:
      "https://images.unsplash.com/photo-1520975918318-b9162edab2a8?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 13,
  },
  {
    id: 30,
    name: "Stephen King",
    slug: "stephen-king",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 30,
  },
  {
    id: 31,
    name: "Tana French",
    slug: "tana-french",
    image:
      "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 7,
  },
  {
    id: 32,
    name: "Terry Pratchett",
    slug: "terry-pratchett",
    image:
      "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 25,
  },
  {
    id: 33,
    name: "Veronica Roth",
    slug: "veronica-roth",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    publishedBooksCount: 6,
  },
];

// AuthorFilter Component
function AuthorFilter({ selectedLetter, onLetterSelect }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const allOptions = ["ALL", "0-9", ...alphabet];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {allOptions.map((letter) => {
          const isActive =
            selectedLetter === letter ||
            (selectedLetter === null && letter === "ALL");
          return (
            <button
              key={letter}
              onClick={() => onLetterSelect(letter === "ALL" ? null : letter)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// AuthorCard Component
function AuthorCard({ author }) {
  return (
    <div>
      <Link href={`/author/${author.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={author.image}
            alt={author.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {author.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {author.publishedBooksCount}{" "}
              {author.publishedBooksCount === 1 ? "book" : "books"} published
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// AuthorGrid Component
function AuthorGrid({
  authors,
  gridCols = "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
}) {
  return (
    <div className={`grid ${gridCols} gap-6`}>
      {authors.map((author) => (
        <AuthorCard key={author.id} author={author} />
      ))}
    </div>
  );
}

// Main AuthorsPage Component
export default function AuthorsPage() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const filteredAuthors = selectedLetter
    ? sampleAuthors.filter((author) => {
        const firstChar = author.name[0].toUpperCase();
        if (selectedLetter === "0-9") {
          return /^[0-9]/.test(firstChar);
        }
        return firstChar === selectedLetter;
      })
    : sampleAuthors;

  return (
    <div className="py-8 ">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Our Authors
      </h1>

      <AuthorFilter
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />

      {filteredAuthors.length > 0 ? (
        <>
          <div className="mb-4 text-center text-gray-600">
            {selectedLetter
              ? `Showing ${filteredAuthors.length} authors starting with "${selectedLetter}"`
              : `Showing all ${filteredAuthors.length} authors`}
          </div>
          <AuthorGrid
            authors={filteredAuthors}
            gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          />
        </>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium mb-2">No authors found</h3>
          <p className="text-gray-400">
            {selectedLetter
              ? `No authors found starting with "${selectedLetter}"`
              : "No authors available"}
          </p>
        </div>
      )}
    </div>
  );
}
