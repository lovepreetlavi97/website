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
  const quantity = cartItems.find(item => item.id === id)?.quantity || 0;
  const isInWishlist = wishlistItems.some(item => item.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      secondaryImage: images?.[1] || image,
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product image and badge area */}
      <div className="relative">
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Heart className="w-5 h-5" fill={isInWishlist ? "#FF5385" : "none"} stroke={isInWishlist ? "#FF5385" : "currentColor"} />
        </button>

        {/* Tag/Badge */}
        {tag && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded">
              {tag}
            </span>
          </div>
        )}

        {/* Product Image */}
        <Link href={`/product/${slug}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Rating */}
        <div className="mb-1 flex items-center">
          {rating > 0 && (
            <>
              <div className="bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                <span className="text-sm font-medium text-green-700 mr-1">{rating.toFixed(1)}</span>
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              </div>
              {reviewCount > 0 && (
                <span className="text-sm text-gray-500 ml-2">|&nbsp;{reviewCount}</span>
              )}
            </>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/product/${slug}`}>
          <h3 className="text-gray-700 font-medium text-sm mb-1 line-clamp-2 hover:text-pink-600 transition-colors">{name}</h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-900 font-semibold">₹{price.toLocaleString()}</span>
          {originalPrice > price && (
            <span className="text-gray-500 text-sm line-through">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-1 rounded font-medium text-center transition-colors ${
            quantity > 0
              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              : 'bg-gradient-to-r from-rose-400 to-red-500 text-white hover:bg-pink-700'
          } cursor-pointer`}
        >
          {quantity > 0 ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 