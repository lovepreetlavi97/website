'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Share2, Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/features/cartSlice';
import { getProductBySlug } from '@/app/data/products';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  specs: string[];
  image: string;
  images?: any; // ✅ Add this
  slug: string;
}

export default function ProductPage({ slug }: { slug: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const product = getProductBySlug(slug) || {
    id: "1",
    name: "Cherry Blossom Silver Ring",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 156,
    description: "This elegant Cherry Blossom Silver Ring is crafted with precision and care...",
    specs: [
      "Material: 925 Sterling Silver",
      "Finish: Rhodium Plated",
      "Dimension: Adjustable Band",
      "Weight: 3.2 grams"
    ],
    image: "/images/product-1.jpg",
    images: [
      "/images/product-1.jpg",
      "/images/product-2.jpg",
      "/images/product-3.jpg",
      "/images/product-4.jpg"
    ],
    slug: "cherry-blossom-silver-ring"
  } as Product;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      secondaryImage: product.images?.[0],
      slug: product.slug,
      quantity
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-500">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/collections/all" className="text-gray-500 hover:text-pink-500">Collections</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden bg-gray-100">
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image: any, index: any) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-medium text-gray-900">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-medium text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-sm font-medium text-green-600">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="space-y-1 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Specifications:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-6">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border-gray-300 text-sm focus:border-pink-500 focus:ring-pink-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 hover:text-pink-500">
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-pink-500">
                  <Share2 className="w-5 h-5 mr-2" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Add related products here */}
          </div>
        </div>
      </main>
    </div>
  );
}
