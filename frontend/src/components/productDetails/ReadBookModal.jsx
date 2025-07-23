"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker (you'll need to serve this from your public folder)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const ReadBookModal = ({ pdfUrl, title, isPremium = false, onClose, maxPages = 10 }) => {
  const [zoom, setZoom] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displayPages, setDisplayPages] = useState(0); // Pages available to view
  const [rotation, setRotation] = useState(0);
  const [pageRendering, setPageRendering] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

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
        
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        setPdfDoc(pdf);
        const actualPages = pdf.numPages;
        setTotalPages(actualPages);
        
        // Limit pages based on premium status and maxPages prop
        const availablePages = isPremium ? actualPages : Math.min(maxPages, actualPages);
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

  // Render current page
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfDoc || pageRendering) return;

    setPageRendering(true);
    
    try {
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Calculate viewport with zoom and rotation
      let viewport = page.getViewport({ scale: zoom, rotation: rotation });
      
      // Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Render page
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
    } catch (err) {
      console.error('Error rendering page:', err);
      setError('Failed to render page');
    } finally {
      setPageRendering(false);
    }
  }, [pdfDoc, zoom, rotation, pageRendering]);

  // Render page when dependencies change
  useEffect(() => {
    if (pdfDoc && currentPage > 0) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, zoom, rotation, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        goToPrevPage();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        goToNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentPage, displayPages]);

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

  const handleZoomIn = () => {
    setZoom(Math.min(3.0, zoom + 0.25));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePageInput = (e) => {
    const pageNum = parseInt(e.target.value);
    if (pageNum >= 1 && pageNum <= displayPages) {
      setCurrentPage(pageNum);
    }
  };

  // Check if user has reached the page limit
  const isAtPageLimit = !isPremium && currentPage >= displayPages && displayPages < totalPages;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 truncate max-w-md">
            {title}
          </h2>
          {isLoading && (
            <span className="text-sm text-blue-600">Loading...</span>
          )}
          {error && (
            <span className="text-sm text-red-600">Error</span>
          )}
          {!isPremium && displayPages < totalPages && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Limited Preview
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          {displayPages > 0 && (
            <>
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1 || pageRendering}
                className="p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
                aria-label="Previous page"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="number"
                  value={currentPage}
                  min={1}
                  max={displayPages}
                  onChange={handlePageInput}
                  className="w-16 px-2 py-1 text-center border rounded"
                />
                <span className="text-gray-600">
                  of {displayPages}
                  {!isPremium && totalPages > displayPages && (
                    <span className="text-orange-600"> (Preview)</span>
                  )}
                </span>
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage >= displayPages || pageRendering}
                className="p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
                aria-label="Next page"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Zoom Controls */}
          <div className="border-l pl-2 ml-2">
            <button
              onClick={handleZoomOut}
              disabled={isLoading || pageRendering}
              className="p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
              aria-label="Zoom out"
              type="button"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm text-gray-600 min-w-16 text-center inline-block">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={isLoading || pageRendering}
              className="p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
              aria-label="Zoom in"
              type="button"
            >
              <ZoomIn size={20} />
            </button>
          </div>

          {/* Rotate Button */}
          <button
            onClick={handleRotate}
            disabled={isLoading || pageRendering}
            className="p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
            aria-label="Rotate page"
            type="button"
          >
            <RotateCw size={20} />
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 transition ml-2"
            aria-label="Close modal"
            type="button"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-gray-100 relative overflow-auto p-4"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-6 shadow-lg flex items-center gap-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Loading PDF...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={32} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading PDF</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        )}

        {/* Page Limit Reached Overlay */}
        {isAtPageLimit && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md mx-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Limit Reached</h3>
              <p className="text-gray-600 mb-6">
                You've reached the {maxPages}-page preview limit. 
                This book has {totalPages} pages total.
              </p>
              <button
                onClick={onClose}
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition mr-3"
              >
                Continue Reading Later
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* PDF Canvas */}
        {!error && !isLoading && (
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-full max-h-full">
            <canvas
              ref={canvasRef}
              className="block max-w-full max-h-full"
              style={{
                cursor: pageRendering ? 'wait' : 'default'
              }}
            />
            {pageRendering && (
              <div className="absolute inset-0 bg-white bg-opacity-30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        )}

        {/* No PDF URL Fallback */}
        {!pdfUrl && !isLoading && (
          <div className="bg-white rounded-lg p-12 shadow-lg text-center max-w-md">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No PDF Available</h3>
            <p className="text-gray-500">Please provide a valid PDF URL to view the book content.</p>
          </div>
        )}
      </div>

      {/* Footer with Premium Upgrade Notice */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="text-center">
            <p className="text-sm mb-2">
              {displayPages < totalPages 
                ? `Preview limited to ${maxPages} pages of ${totalPages} total pages`
                : "You're viewing with limited features"
              }
            </p>
            <button 
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              type="button"
            >
              Upgrade to Premium for Full Access
            </button>
          </div>
        </div>
      )}
      
      {/* Navigation Hint */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
        Use arrow keys to navigate • Press ESC to close
      </div>
    </div>
  );
};

export default ReadBookModal;