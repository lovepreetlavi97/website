'use client';

import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import { removeFromWishlist } from '../store/features/wishlistSlice';
import { Link, Share } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  // const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const [activeTab, setActiveTab] = useState('wishlist');
  const [open, setOpen] = useState(false);

  // const handleRemoveFromWishlist = (id: string) => {
  //   dispatch(removeFromWishlist(id));
  // };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 py-10 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Tabs and Share */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-10">
              <button
                className={`text-lg font-semibold pb-1 border-b-2 transition-all ${activeTab === 'wishlist' ? 'text-pink-500 border-pink-400' : 'text-gray-400 border-transparent'} cursor-pointer`}
                onClick={() => setActiveTab('wishlist')}
              >
                My Wishlist
              </button>
              <button
                className={`text-lg font-semibold pb-1 border-b-2 transition-all ${activeTab === 'recent' ? 'text-pink-500 border-pink-400' : 'text-gray-400 border-transparent'} cursor-pointer`}
                onClick={() => setActiveTab('recent')}
              >
                Recently Viewed
              </button>
            </div>
            <button 
              className="flex items-center gap-2 text-pink-500 font-medium hover:underline cursor-pointer" 
              onClick={() => setOpen(true)}
            >
              <Share className="w-5 h-5" /> Share Wishlist
            </button>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
              {wishlistItems.map(item => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.image}
                  images={item.images}
                  slug={item.slug}
                  tag={item.tag}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Add items to your wishlist to see them here</p>
              <Link
                href="/collections/all" 
                className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors cursor-pointer"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        shareUrl="https://yourwebsite.com/wishlist/123"
        title="Share Wishlist"
      />
    </div>
  );
} 