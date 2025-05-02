"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Share2, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/store/features/cartSlice';
import { getProductBySlug, products as allProducts } from '@/app/data/products';
import ProductCard from '@/app/components/ProductCard';
import ShareModal from '@/app/components/ShareModal';
import { addToWishlist, removeFromWishlist } from '@/app/store/features/wishlistSlice';
import { RootState } from "@/app/store/store";
import ProductDetailSkeleton from '@/app/components/ProductDetailSkeleton';
import { useLoading } from '@/app/contexts/LoadingContext';

const finishOptions = [
  { id: 'silver', name: 'SILVER', image: '/images/silver-option.jpg' },
  { id: 'rose-gold', name: 'ROSE GOLD', image: '/images/rose-gold-option.jpg' },
];

const features = [
  { id: 'return', name: 'Easy 30 Day Return', icon: '🔄' },
  { id: 'plating', name: 'Lifetime Plating', icon: '✨' },
  { id: 'warranty', name: '6-Month Warranty', icon: '🛡️' },
  { id: 'silver', name: 'Fine 925 Silver', icon: '💎' },
];

const reviews = [
  {
    id: 1, 
    name: 'Shreya M.', 
    rating: 5, 
    date: '2 months ago',
    title: 'Beautiful and Elegant',
    comment: 'This necklace is absolutely stunning! The deer heart design is so unique and elegant. I wear it almost every day and get so many compliments.'
  },
  {
    id: 2, 
    name: 'Priya K.', 
    rating: 4, 
    date: '3 months ago',
    title: 'Great Quality',
    comment: 'The quality is excellent. Chain is strong and the pendant is beautiful. I would have given 5 stars but delivery was slightly delayed.'
  },
  {
    id: 3, 
    name: 'Aditya R.', 
    rating: 5, 
    date: '1 month ago',
    title: 'Perfect Gift',
    comment: "Bought this for my girlfriend's birthday and she absolutely loved it! The packaging was also very premium which added to the experience."
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState('silver');
  const [pincode, setPincode] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();
  
  // Get product based on slug - moved this up before it's used
  const product = getProductBySlug(params.slug) || {
    id: "1",
    name: "Cherry Blossom Silver Ring",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 156,
    description: "This elegant Cherry Blossom Silver Ring is crafted with precision and care. The delicate petals create a stunning floral design that captures the beauty of nature. Made from 925 sterling silver, this ring is perfect for everyday wear or special occasions.",
    specs: [
      "Material: 925 Sterling Silver",
      "Finish: Rhodium Plated",
      "Dimension: Adjustable Band",
      "Weight: 3.2 grams"
    ],
    image: "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
    images: [
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533"
    ],
    slug: "cherry-blossom-silver-ring",
    category: "rings"
  };
  
  // Now we can safely access the product in these selectors
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const quantityCart = cartItems.find(item => item.id === product.id)?.quantity || 0;
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  // Get related products from the same category (filter out current product)
  const relatedProducts = product.category 
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : allProducts.filter(p => p.id !== product.id).slice(0, 4);

  useEffect(() => {
    // Simulate data loading
    try {
      setIsLoading(true);
    } catch (error) {
      console.error('Error setting loading state:', error);
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
      try {
        setIsLoading(false);
      } catch (error) {
        console.error('Error resetting loading state:', error);
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      try {
        setIsLoading(false);
      } catch (error) {
        console.error('Error cleaning up loading state:', error);
      }
    };
  }, [params.slug, setIsLoading]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      secondaryImage: product.images[1] || product.image,
      slug: product.slug,
      quantity
    }));
  };

  const checkDelivery = () => {
    // Simulated delivery check
    alert(`Delivery to ${pincode} available. Estimated delivery in 3-5 business days.`);
  };

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        description: product.description || "",
        specs: product.specs || [],
        image: product.image,
        images: product.images || [product.image],
        slug: product.slug,
        category: product.category || "",
        tag: product.tag
      }));
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-20 py-8">
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
          {/* Product Images */}
          <div className="relative">
            {/* Image with navigation arrows */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
              <button 
                onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              <button 
                onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Thumbnail navigation */}
            <div className="flex space-x-2 overflow-x-auto mt-4 pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Price and Share Icons */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-medium text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-500">MRP ₹{product.originalPrice.toLocaleString()} <span className="text-xs">(incl. of all taxes)</span></span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(true)}>
                  <Share2 className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-gray-100 cursor-pointer" onClick={handleWishlistToggle}>
                  <Heart 
                    className={`h-5 w-5 ${isInWishlist ? 'text-pink-500' : 'text-gray-500'}`} 
                    fill={isInWishlist ? '#EC4899' : 'none'}
                  />
                </button>
              </div>
            </div>
            
            {/* Product Title */}
            <h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
            
            {/* Pure Silver text */}
            <p className="text-gray-700">Made With Pure 925 Silver</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="ml-1 text-amber-700 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">| {product.reviewCount}</span>
            </div>
            
            {/* Finish Options */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Choose Your Finish</h3>
              <div className="flex space-x-4">
                {finishOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFinish(option.id)}
                    className={`border rounded-lg p-2 w-24 flex flex-col items-center cursor-pointer ${
                      selectedFinish === option.id ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-16 h-16 relative mb-2">
                      <Image 
                        src={option.image} 
                        alt={option.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Delivery Estimate */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Estimated Delivery Time</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter 6 digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
                <button
                  onClick={checkDelivery}
                  className="bg-pink-50 border border-pink-500 text-pink-600 font-medium px-4 py-2 rounded-r-md hover:bg-pink-100 cursor-pointer"
                >
                  Check
                </button>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map(feature => (
                <div key={feature.id} className="flex items-center">
                  <span className="text-xl mr-2">{feature.icon}</span>
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
              ))}
            </div>
            
            {/* Gift Wrap Option */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="gift-wrap"
                className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
              />
              <label htmlFor="gift-wrap" className="text-sm text-gray-700">
                Add <span className="text-pink-600">gift wrap</span> to your order (₹50)
              </label>
            </div>
            
            {/* Add to Cart and Buy Now Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border border-pink-500 text-pink-600 py-2 rounded-md hover:bg-pink-50 transition-colors cursor-pointer"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-2 rounded-md transition-colors cursor-pointer ${
                  quantityCart > 0 
                    ? 'bg-pink-100 text-pink-600 border border-pink-500 hover:bg-pink-200' 
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {quantityCart > 0 ? 'Added to Cart' : 'Add To Cart'}
              </button>
            </div>
            
            {/* Product Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Specifications */}
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-lg font-medium">{product.rating}</span>
              <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {visibleReviews.map(review => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{review.title}</h3>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.name}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
                {/* Product Image for Review */}
                <div className="mt-2">
                  <Image 
                    src={product.image} 
                    alt={`Image for review by ${review.name}`} 
                    width={100} 
                    height={100} 
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
            
            {reviews.length > 2 && (
              <button 
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-pink-600 font-medium hover:text-pink-700 cursor-pointer"
              >
                {showAllReviews ? 'Show Less Reviews' : 'View All Reviews'}
              </button>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                price={relatedProduct.price}
                originalPrice={relatedProduct.originalPrice}
                image={relatedProduct.image}
                images={relatedProduct.images}
                slug={relatedProduct.slug}
                rating={relatedProduct.rating}
                reviewCount={relatedProduct.reviewCount}
                tag={relatedProduct.tag}
                description={relatedProduct.description}
                specs={relatedProduct.specs}
                category={relatedProduct.category}
              />
            ))}
          </div>
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
