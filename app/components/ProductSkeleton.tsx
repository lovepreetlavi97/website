import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Product image skeleton */}
      <div className="relative">
        <div className="aspect-square bg-gray-200" />
      </div>

      {/* Product info skeleton */}
      <div className="p-3">
        {/* Rating skeleton */}
        <div className="mb-1 flex items-center">
          <div className="bg-gray-200 h-5 w-16 rounded"></div>
        </div>

        {/* Product name skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-1 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton; 