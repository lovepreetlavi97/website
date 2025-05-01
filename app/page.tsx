"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import { categories } from './data/categories';
import { shopByCategory } from './data/shopByCategory';
import { featuredCollections } from './data/featuredCollections';
import { curatedItems } from './data/curatedItems';
import { instagramPosts } from './data/instagramPosts';
import { customerReviews } from './data/customerReviews';
import { getFeaturedProducts, getTrendingProducts } from './data/products';
import { useLoading } from './contexts/LoadingContext';

const weAreGiva = [1, 2, 3, 4]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();

  const slides = [
    {
      id: 1,
      image: '/images/Mens_jewellery_hero_banner.jpg',
      title: "UP TO 30% OFF",
      description: "On all jewelry items. Limited time offer.",
      link: "/shop",
      linkText: "SHOP NOW"
    },
    {
      id: 2,
      image: '/images/Mens_jewellery_hero_banner.jpg',
      title: "Akshaya Tritiya Special",
      description: "Free silver coin with your purchase",
      link: "/shop",
      linkText: "SHOP NOW"
    },
    {
      id: 3,
      image: '/images/Mens_jewellery_hero_banner.jpg',
      title: "Bestseller Collection",
      description: "Our most loved designs",
      link: "/bestsellers",
      linkText: "EXPLORE"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        setShowLeftArrow(categoriesRef.current.scrollLeft > 0);
        setShowRightArrow(
          categoriesRef.current.scrollLeft <
          categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth - 10
        );
      }
    };

    const categoriesEl = categoriesRef.current;
    if (categoriesEl) {
      categoriesEl.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (categoriesEl) {
        categoriesEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollLeft = direction === 'left'
        ? categoriesRef.current.scrollLeft - scrollAmount
        : categoriesRef.current.scrollLeft + scrollAmount;

      categoriesRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (categoriesRef.current?.offsetLeft || 0));
    setScrollLeft(categoriesRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    if (categoriesRef.current) {
      const x = e.pageX - (categoriesRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2; // Scroll speed multiplier
      categoriesRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Add loading effect with better error handling
  useEffect(() => {
    // Show loading state on initial load
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
  }, [setIsLoading]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner - Converted to Slider */}
      <section className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative">
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
                <Image
                  src={slide.image}
                  alt={`GIVA Jewelry - ${slide.title}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                />
              </div>
      </div>
          ))}
          </div>
          
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full bg-white transition-opacity ${currentSlide === index ? 'opacity-100' : 'opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Category Icons - Horizontal Scrolling */}
      <section className="py-6 bg-white overflow-hidden relative">
        <div className="mx-auto px-4">
          {/* Left scroll button */}
          {showLeftArrow && (
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}

          {/* Right scroll button */}
          {showRightArrow && (
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          )}

          <div
            ref={categoriesRef}
            className="flex overflow-x-auto pb-4 relative no-scrollbar scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Regular categories */}
            {loading ? (
              // Skeleton for categories
              [...Array(5)].map((_, index) => (
                <div key={index} className="flex-shrink-0 flex flex-col items-center w-1/3 sm:w-auto md:w-auto animate-pulse">
                  <div className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] md:w-[250px] md:h-[250px] flex items-center justify-center mb-2 overflow-hidden rounded-full bg-gray-200 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                </div>
              ))
            ) : (
              // Actual categories
              categories.map((category, index) => (
                <Link
                  href={`/collections/${category.slug}`}
                  key={index}
                  className="flex-shrink-0 flex flex-col items-center w-1/3 sm:w-auto md:w-auto"
                >
                  <div className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] md:w-[250px] md:h-[250px] flex items-center justify-center mb-2 overflow-hidden rounded-full bg-gray-50 mx-auto">
                    <Image 
                      src={category.image}
                      alt={category.name}
                      width={250}
                      height={250}
                      sizes="(max-width: 640px) 100px, (max-width: 768px) 180px, 250px"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm sm:text-base md:text-[20px] text-center whitespace-nowrap">{category.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <div className="bg-gradient-to-b from-pink-50 to-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Shop Essentials</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              getFeaturedProducts().map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))
            )}
          </div>
              </div>
            </div>
            
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-pink-800">Mother's Day Special</h2>
            <p className="mt-2 text-pink-700">Celebrate with our exclusive collection</p>
            <Link href={`/collections/mothers-day-special`}>
              <button className="mt-4 rounded-full bg-pink-600 px-6 py-2 font-medium text-white hover:bg-pink-700 cursor-pointer">
                Shop Now
              </button>
            </Link>
          </div>
                <Image 
            src="https://www.giva.co/cdn/shop/files/Frame_1000009460_1.jpg?v=1744794541&width=1500"
            alt="Mother's Day Special"
            width={300}
            height={200}
            className="h-auto w-full max-w-xs rounded-lg object-cover"
                />
              </div>
            </div>
            
      {/* Shop By Category */}
      <div className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Shop By Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shopByCategory.map((category) => (
              <div key={category.name} className="overflow-hidden rounded-lg">
                <Link href={`/collections/${category.slug}`} className="group relative block">
                <Image 
                    src="https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533"
                    alt={category.name}
                    width={300}
                    height={300}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
                    <span className="text-lg font-medium text-white">{category.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
            </div>
            
      {/* We Are Giva */}
      <div className="bg-pink-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">We Are Giva</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {weAreGiva.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg cursor-pointer">
                <Link href={`/collections/we-are-giva`}>
                <Image 
                  src="https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500"
                    alt={`Giva ${index + 1}`}
                    width={300}
                    height={300}
                    className="h-auto w-full"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
          </div>
          
      {/* Product Grid */}
      <div className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Trending Now</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              getTrendingProducts().map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Featured Collections */}
      <div className="bg-gradient-to-b from-pink-50 to-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Featured Collections</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredCollections.map((collection) => (
              <div key={collection.name} className="overflow-hidden rounded-lg">
                <Link href={`/collections/${collection.slug}`} className="group relative block">
                <Image 
                    src="https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550"
                    alt={collection.name}
                    width={300}
                    height={300}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
                    <span className="text-lg font-medium text-white">{collection.name}</span>
              </div>
                </Link>
              </div>
            ))}
          </div>
              </div>
            </div>
            
      {/* Curated For You */}
      <div className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Curated For You</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {curatedItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg bg-pink-50 p-4 text-center cursor-pointer">
                <Link href={`/collections/${item.slug}`}>
                <Image 
                    src="https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300"
                    alt={item.name}
                    width={200}
                    height={200}
                    className="mx-auto h-auto w-full max-w-[150px]"
                  />
                </Link>
                <h3 className="mt-2 font-medium">{item.name}</h3>
                <Link href={`/collections/${item.slug}`} className="mt-2 rounded-full border border-pink-500 px-4 py-1 text-sm text-pink-500 hover:bg-pink-500 hover:text-white cursor-pointer">
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="py-12 bg-white w-full">
        <div className="w-full px-4">
          <h2 className="mb-1 text-center text-2xl font-bold">Follow Us on Instagram</h2>
          <h3 className='mb-8 text-center text-2xl font-bold'>@username</h3>
          <div className="relative">
            {/* Left scroll button */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {/* Right scroll button */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            )}

            <div
              ref={categoriesRef}
              className="flex space-x-4 overflow-x-auto pb-4 relative no-scrollbar scroll-smooth"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {instagramPosts.map((post, index) => (
                <a
                  href={post.link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group relative"
                >
                  <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] overflow-hidden">
                <Image 
                      src={post.image}
                      alt={post.caption}
                      width={400}
                      height={400}
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, 400px"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-1 transition-opacity duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                        <p className="text-sm font-bold text-black text-[20px]">{post.caption}</p>
                      </div>
                    </div>
              </div>
                </a>
              ))}
            </div>
          </div>
              </div>
            </div>
            

      {/* Customer Reviews */}
      <div className="py-12 bg-gradient-to-b from-white to-pink-50 w-full">
        <div className="w-full px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">What Our Customers Say</h2>
          <div className="relative">
            {/* Left scroll button */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {/* Right scroll button */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 md:p-2 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            )}

            <div
              ref={categoriesRef}
              className="flex space-x-6 overflow-x-auto pb-4 relative no-scrollbar scroll-smooth"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {customerReviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[320px]">
                  <div className="w-full h-[200px] overflow-hidden">
                <Image 
                      src={review.avatar}
                      alt={review.name}
                      width={150}
                      height={150}
                      className="w-[100px] h-[100px] object-cover rounded-full mx-auto mt-4 border-2 border-pink-200"
                />
              </div>
                  <div className="p-6 flex-grow flex flex-col text-center">
                    <h3 className="font-semibold text-gray-800 mb-1">{review.name}</h3>
                    <div className="flex items-center mb-3 mx-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                      ))}
              </div>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-auto">{review.date}</p>
              </div>
            </div>
              ))}
            </div>
          </div>
        </div>
            </div>
            
      {/* Newsletter */}
      <div className="py-12 bg-pink-50 w-full">
        <div className="w-full px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-gray-600 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-pink-500 text-white rounded-[10px] font-medium hover:bg-pink-600 transition-colors duration-300 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







