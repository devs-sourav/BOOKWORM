import React from 'react';

const FormatSection = () => {
  const formats = [
    { name: 'Hardcover', count: 33, href: '/shop?format=hardcover' },
    { name: 'Kindle', count: 34, href: '/shop?format=kindle' },
    { name: 'Kindle Edition', count: 15, href: '/shop?format=kindle-edition' },
    { name: 'Paperback', count: 36, href: '/shop?format=paperback' }
  ];

  return (
    <ul className="space-y-2 px-6 pb-6">
      {formats.map((format) => (
        <li key={format.name}>
          <a
            href={format.href}
            className="text-gray-700 hover:text-blue-600 text-sm py-1 block transition-colors flex justify-between"
          >
            <span>{format.name}</span>
            <span className="text-gray-500">({format.count})</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FormatSection;