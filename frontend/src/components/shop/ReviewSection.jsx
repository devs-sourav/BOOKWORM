import React from 'react';
import { Star } from 'lucide-react';

const ReviewSection = () => {
  const ratings = [
    { rating: 5, count: 25, href: '/shop?rating=5' },
    { rating: 4, count: 5, href: '/shop?rating=4' },
    { rating: 3, count: 1, href: '/shop?rating=3' },
    { rating: 2, count: 2, href: '/shop?rating=2' }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center ">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <ul className="space-y-2 px-6 pb-6">
      {ratings.map((rating) => (
        <li key={rating.rating}>
          <a
            href={rating.href}
            className="flex items-center justify-between text-gray-700 hover:text-blue-600 text-sm py-1 transition-colors"
          >
            <div className="flex items-center space-x-2">
              {renderStars(rating.rating)}
            </div>
            <span className="text-gray-500">({rating.count})</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ReviewSection;
