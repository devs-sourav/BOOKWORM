import Image from 'next/image';
import Link from 'next/link';

const AuthorCard = ({
  author,
  className = '',
}) => {
  const {
    name,
    slug,
    image,
    publishedBooksCount = 0,
    alt = name,
  } = author;

  return (
    <div
      className={`group relative rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 ${className}`}
      role="article"
    >
      <Link
        href={`/book-author/${slug}`}
        title={name}
        className="block"
      >
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="text-center mt-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {publishedBooksCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {publishedBooksCount} Published Book{publishedBooksCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AuthorCard;
