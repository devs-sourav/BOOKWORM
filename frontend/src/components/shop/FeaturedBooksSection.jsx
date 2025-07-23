import React from 'react';

const FeaturedBooksSection = () => {
  const featuredBooks = [
    {
      title: 'Blindside (Michael Bennett Book 12)',
      price: 15.99,
      image: '/images/products/1.jpg',
      href: '/product/blindside-michael-bennett-book-12'
    },
    {
      title: 'Until the End of Time: Mind, Matter, and Our Search for Meaning in an Evolving Universe',
      price: 12.99,
      image: '/images/products/2.jpg',
      href: '/product/until-the-end-of-time'
    },
    {
      title: 'Open Book: A Memoir',
      price: 10.35,
      image: '/images/products/3.jpg',
      href: '/product/open-book-a-memoir'
    }
  ];

  return (
    <ul className="space-y-4 px-6 pb-6 pt-3">
      {featuredBooks.map((book) => (
        <li key={book.title}>
          <div className="flex space-x-3">
            <a href={book.href} className="flex-shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-12 h-16 object-cover rounded"
              />
            </a>
            <div className="flex-1 min-w-0">
              <a
                href={book.href}
                className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 transition-colors"
              >
                {book.title}
              </a>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                ${book.price}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FeaturedBooksSection;
