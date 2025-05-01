import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <main className="container mx-auto px-20 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <div className="flex">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="mx-2 h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="mx-2 h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images skeleton */}
          <div className="relative">
            {/* Main image */}
            <div className="relative aspect-square bg-gray-200 rounded-lg"></div>
            
            {/* Thumbnail navigation */}
            <div className="flex space-x-2 mt-4 pb-2">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info skeleton */}
          <div className="space-y-6">
            {/* Price and Share Icons */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
                <div className="ml-2 h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="p-2 h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="p-2 h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            
            {/* Product Title */}
            <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
            
            {/* Pure Silver text */}
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
            
            {/* Finish Options */}
            <div className="space-y-3">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="flex space-x-4">
                <div className="border rounded-lg p-2 w-24 flex flex-col items-center bg-gray-200">
                  <div className="w-16 h-16 mb-2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="border rounded-lg p-2 w-24 flex flex-col items-center bg-gray-200">
                  <div className="w-16 h-16 mb-2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Delivery Estimate */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="flex">
                <div className="flex-grow h-10 bg-gray-200 rounded-l-md"></div>
                <div className="w-20 h-10 bg-gray-200 rounded-r-md"></div>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 mr-2 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Gift Wrap Option */}
            <div className="flex items-center space-x-2 pt-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            
            {/* Add to Cart and Buy Now Buttons */}
            <div className="flex space-x-4 pt-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
              <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
            </div>
            
            {/* Product Description */}
            <div className="pt-6 border-t border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section skeleton */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-48 bg-gray-200 rounded"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
          
          <div className="space-y-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg h-40"></div>
            ))}
          </div>
        </div>

        {/* Related Products Section skeleton */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="h-7 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailSkeleton; 