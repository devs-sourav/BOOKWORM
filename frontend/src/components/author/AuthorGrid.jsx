import AuthorCard from './AuthorCard';

const AuthorGrid = ({ 
  authors = [], 
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
}) => {
  if (!authors || authors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No authors found.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6 ${className}`}>
      {authors.map((author) => (
        <AuthorCard 
          key={author.id} 
          author={author}
          className="col-span-1"
        />
      ))}
    </div>
  );
};

export default AuthorGrid;