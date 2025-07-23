import { useState, useEffect, useCallback, useRef } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCw, Download, Bookmark, Search, AlertCircle } from "lucide-react";

const EnhancedPDFModal = ({ 
  pdfUrl, 
  title, 
  isPremium = false, 
  onClose, 
  maxPages = 10,
  bookId,
  onBookmark,
  onDownload
}) => {
  const [zoom, setZoom] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displayPages, setDisplayPages] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Load PDF document
  useEffect(() => {
    if (!pdfUrl) {
      setError("No PDF URL provided");
      setIsLoading(false);
      return;
    }

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // For demo purposes, set some default values
        // In a real implementation, you'd extract this info from the PDF
        const mockTotalPages = 25;
        setTotalPages(mockTotalPages);
        
        const availablePages = isPremium ? mockTotalPages : Math.min(maxPages, mockTotalPages);
        setDisplayPages(availablePages);
        
        setCurrentPage(1);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. Please check the URL and try again.');
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl, isPremium, maxPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isSearchVisible) {
          setIsSearchVisible(false);
        } else {
          onClose?.();
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        goToPrevPage();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        goToNextPage();
      } else if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        setIsSearchVisible(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else if (event.key === 'b' && event.ctrlKey) {
        event.preventDefault();
        toggleBookmark();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, displayPages, isSearchVisible]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < displayPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => setZoom(Math.min(3.0, zoom + 0.25));
  const handleZoomOut = () => setZoom(Math.max(0.5, zoom - 0.25));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePageInput = (e) => {
    const pageNum = parseInt(e.target.value);
    if (pageNum >= 1 && pageNum <= displayPages) {
      setCurrentPage(pageNum);
    }
  };

  const toggleBookmark = () => {
    const bookmark = { page: currentPage, title: `Page ${currentPage}` };
    setBookmarks(prev => {
      const exists = prev.find(b => b.page === currentPage);
      if (exists) {
        return prev.filter(b => b.page !== currentPage);
      }
      return [...prev, bookmark];
    });
    onBookmark?.(bookmark);
  };

  const isBookmarked = bookmarks.some(b => b.page === currentPage);
  const isAtPageLimit = !isPremium && currentPage >= displayPages && displayPages < totalPages;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Generate PDF viewer URL with page number
  const getPdfViewerUrl = () => {
    if (!pdfUrl) return '';
    
    // For Google Drive PDFs, use the embed viewer
    if (pdfUrl.includes('drive.google.com')) {
      const fileId = pdfUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    
    // For other PDFs, use the direct URL with page parameter
    const urlWithPage = `${pdfUrl}#page=${currentPage}&zoom=${Math.round(zoom * 100)}&rotate=${rotation}`;
    return urlWithPage;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-lg border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 truncate max-w-md">
            {title}
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-blue-600">Loading...</span>
            </div>
          )}
          {!isPremium && displayPages < totalPages && (
            <span className="text-xs bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full font-medium">
              Preview Mode
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            onClick={() => {
              setIsSearchVisible(!isSearchVisible);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Search (Ctrl+F)"
          >
            <Search size={20} />
          </button>

          {/* Bookmark */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked 
                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                : 'hover:bg-gray-100'
            }`}
            title="Bookmark Page (Ctrl+B)"
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Download */}
          {isPremium && (
            <button
              onClick={() => onDownload?.(pdfUrl, title)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Download PDF"
            >
              <Download size={20} />
            </button>
          )}

          {/* Page Navigation */}
          {displayPages > 0 && (
            <>
              <div className="mx-2 h-6 w-px bg-gray-300"></div>
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1 rounded-lg">
                <input
                  type="number"
                  value={currentPage}
                  min={1}
                  max={displayPages}
                  onChange={handlePageInput}
                  className="w-12 text-center border-0 bg-transparent outline-none"
                />
                <span className="text-gray-600">
                  / {displayPages}
                </span>
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage >= displayPages}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Zoom & Rotate Controls */}
          <div className="mx-2 h-6 w-px bg-gray-300"></div>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          
          <span className="text-sm text-gray-600 min-w-16 text-center px-2 py-1 bg-gray-50 rounded">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3.0}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>

          <button
            onClick={handleRotate}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Rotate Page"
          >
            <RotateCw size={20} />
          </button>
          
          <div className="mx-2 h-6 w-px bg-gray-300"></div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
            title="Close (Esc)"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-md">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in document..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsSearchVisible(false);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Loading PDF</h3>
                <p className="text-gray-600">Please wait while we prepare your document...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load PDF</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => window.open(pdfUrl, '_blank')}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Open in New Tab
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Page Limit Overlay */}
        {isAtPageLimit && (
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-md mx-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Preview Complete</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You've viewed {maxPages} of {totalPages} pages. Upgrade to premium to continue reading and unlock all features.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Close Reader
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        {!error && !isLoading && pdfUrl && (
          <div className="w-full h-full flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full h-full max-w-6xl">
              <iframe
                ref={iframeRef}
                src={getPdfViewerUrl()}
                className="w-full h-full border-0"
                title={title}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setError("Failed to load PDF. The file may be corrupted or the URL may be inaccessible.");
                  setIsLoading(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Alternative PDF Viewer for unsupported URLs */}
        {!error && !isLoading && pdfUrl && !pdfUrl.includes('drive.google.com') && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
            <p className="text-sm text-gray-600 mb-2">PDF not displaying correctly?</p>
            <button
              onClick={() => window.open(pdfUrl, '_blank')}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Open in New Tab
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Unlock the Full Reading Experience</h3>
            <p className="text-sm mb-4 text-blue-100">
              Get unlimited access to all {totalPages} pages, download PDFs, advanced search, and more premium features.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bookmarks Sidebar */}
      {bookmarks.length > 0 && (
        <div className="absolute right-4 top-20 bg-white rounded-lg shadow-lg p-4 max-w-sm z-30">
          <h4 className="font-semibold text-gray-900 mb-3">Bookmarks</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {bookmarks.map((bookmark, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(bookmark.page)}
                className="w-full text-left p-2 rounded hover:bg-gray-100 text-sm"
              >
                📖 {bookmark.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full text-sm backdrop-blur">
        <div className="flex items-center gap-4 text-xs">
          <span>← → Navigate</span>
          <span>Ctrl+F Search</span>
          <span>Ctrl+B Bookmark</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPDFModal;