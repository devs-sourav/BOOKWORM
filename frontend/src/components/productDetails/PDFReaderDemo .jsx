import EnhancedPDFModal from "./EnhancedPDFModal";

const PDFReaderDemo = () => {
  const [isReading, setIsReading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [userType, setUserType] = useState('free'); // 'free' or 'premium'

  const samplePDFs = [
    {
      id: 1,
      title: "All You Can Ever Know: A Memoir",
      author: "Nicole Chung",
      price: 14.20,
      category: "Biography & Memoir",
      description: "A powerful and moving memoir about identity, family, and belonging in America.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 16.99,
      category: "Mystery & Thriller",
      description: "A psychological thriller about a woman's act of violence against her husband.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Educated",
      author: "Tara Westover",
      price: 18.50,
      category: "Education & Memoir",
      description: "A memoir about the struggle for self-invention and the power of education.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center"
    }
  ];

  const handleReadBook = (pdf) => {
    setSelectedPdf(pdf);
    setIsReading(true);
  };

  const handleBookmark = (bookmark) => {
    console.log("Bookmarked:", bookmark);
    // In a real app, save to user's bookmarks
  };

  const handleDownload = (url, title) => {
    console.log("Download:", title, url);
    // In a real app, trigger download
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Book className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">BookReader</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUserType('free')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'free' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Free User
                </button>
                <button
                  onClick={() => setUserType('premium')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'premium' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Premium User
                </button>
              </div>
              {userType === 'premium' && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  PREMIUM
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Books</h2>
          <p className="text-gray-600">
            Experience our advanced PDF reader with these sample books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePDFs.map((pdf) => (
            <div key={pdf.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Book Cover */}
              <div className="relative overflow-hidden">
                <img 
                  src={pdf.cover}
                  alt={pdf.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-sm transition-all">
                    <Heart size={18} className="text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {pdf.category}
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                  {pdf.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  by <span className="font-medium text-gray-800">{pdf.author}</span>
                </p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {pdf.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${pdf.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-sm text-gray-600">(4.8)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReadBook(pdf)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Book size={18} />
                    Read Now
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Enhanced Reading Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Search className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Search</h4>
              <p className="text-sm text-gray-600">Find any text within your documents instantly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Bookmark className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Bookmarks</h4>
              <p className="text-sm text-gray-600">Save and organize important pages</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ZoomIn className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Zoom & Rotate</h4>
              <p className="text-sm text-gray-600">Customize viewing for optimal reading</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Offline Access</h4>
              <p className="text-sm text-gray-600">Download for reading anywhere</p>
            </div>
          </div>
        </div>
      </main>

      {/* PDF Modal */}
      {isReading && selectedPdf && (
        <EnhancedPDFModal
          pdfUrl={selectedPdf.pdfUrl}
          title={selectedPdf.title}
          isPremium={userType === 'premium'}
          onClose={() => setIsReading(false)}
          maxPages={10}
          bookId={selectedPdf.id}
          onBookmark={handleBookmark}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default PDFReaderDemo;