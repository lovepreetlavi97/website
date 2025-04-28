"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/features/wishlistSlice";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  slug: string;
  tag?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  specs?: string[];
  category?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  images = [],
  slug,
  tag,
  rating = 0,
  reviewCount = 0,
  description,
  specs,
  category
}: ProductCardProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [isHovered, setIsHovered] = useState(false);
  const quantity = cartItems.find(item => item.id === id)?.quantity || 0;
  const isInWishlist = wishlistItems.some(item => item.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      images: images || [image],
      slug,
      quantity: 1
    }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist({
        id,
        name,
        price,
        originalPrice,
        rating,
        reviewCount,
        description: description || "",
        specs: specs || [],
        image,
        images: images || [image],
        slug,
        category: category || "",
        tag
      }));
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag */}
      {tag && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded">
            {tag}
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors duration-200 ${
          isInWishlist 
            ? 'bg-pink-100 text-pink-600' 
            : 'bg-white/80 text-gray-400 hover:bg-pink-100 hover:text-pink-600'
        }`}
      >
        <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
      </button>

      {/* Product Image */}
      <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden">
        <div className="relative w-full h-full transition-opacity duration-300">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover rounded-t-lg transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={images?.[1] || image}
            alt={`${name} - alternate view`}
            fill
            className={`object-cover rounded-t-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${slug}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900">₹{price.toLocaleString()}</p>
            {originalPrice > price && (
              <p className="text-sm text-gray-500 line-through ml-2">
                ₹{originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          {originalPrice > price && (
            <span className="text-xs font-medium text-green-600">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 cursor-pointer rounded-md transition-colors duration-200 flex items-center justify-center ${
            quantity > 0
              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              : 'bg-pink-600 text-white hover:bg-pink-700'
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {quantity > 0 ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 