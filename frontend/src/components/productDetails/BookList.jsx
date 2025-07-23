"use client";

const books = [
  {
    id: 1,
    title: "Blindside (Michael Bennett Book 12)",
    price: "$15.99",
    image: "/images/products/1.jpg",
  },
  {
    id: 2,
    title: "Until the End of Time: Mind, Matter, and Our",
    price: "$12.99",
    image: "/images/products/2.jpg",
  },
  {
    id: 3,
    title: "Open Book: A Memoir",
    price: "$10.35",
    image: "/images/products/3.jpg",
  },
];

export default function BookList() {
  return (
    <div className="border border-gray-200 p-8 mx-auto space-y-6 bg-white">
      {books.map((book) => (
        <div key={book.id} className="flex ">
          <img
            src={book.image}
            alt={book.title}
            className="w-16 h-auto object-cover mr-4"
          />
          <div>
            <h2 className="text-xs font-normal text-gray-900">{book.title}</h2>
            <p className="text-xs font-normal mt-2">{book.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
