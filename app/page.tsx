"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, User, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

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
            className="flex space-x-6 overflow-x-auto pb-4 relative no-scrollbar scroll-smooth" 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Regular categories */}
            {categories.map((category, index) => (
              <Link 
                href={`/category/${category.slug}`} 
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
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <div className="bg-gradient-to-b from-pink-50 to-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">Shop Essentials</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.image} slug={product.slug} />
            ))}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-pink-800">Mother's Day Special</h2>
            <p className="mt-2 text-pink-700">Celebrate with our exclusive collection</p>
            <button className="mt-4 rounded-full bg-pink-600 px-6 py-2 font-medium text-white hover:bg-pink-700">
              Shop Now
            </button>
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
                <Link href={`/category/${category.slug}`} className="group relative block">
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
              <div key={index} className="overflow-hidden rounded-lg">
                <Image
                  src="https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500"
                  alt={`Giva ${index + 1}`}
                  width={300}
                  height={300}
                  className="h-auto w-full"
                />
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
            {trendingProducts.map((product) => (
              <ProductCard id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.image} slug={product.slug} />
            ))}
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
              <div key={item.id} className="overflow-hidden rounded-lg bg-pink-50 p-4 text-center">
                <Image
                  src="https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300"
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mx-auto h-auto w-full max-w-[150px]"
                />
                <h3 className="mt-2 font-medium">{item.name}</h3>
                <button className="mt-2 rounded-full border border-pink-500 px-4 py-1 text-sm text-pink-500 hover:bg-pink-500 hover:text-white">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}


// Sample data
const categories = [
  { name: "Rings", slug: "rings", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Earrings", slug: "earrings", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Necklaces", slug: "necklaces", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Bracelets", slug: "bracelets", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Anklets", slug: "anklets", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Pendants", slug: "pendants", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Nose Pins", slug: "nose-pins", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
  { name: "Gift Cards", slug: "gift-cards", image: "https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1744980971" },
]

const featuredProducts = [
  { id: 1, name: "Silver Heart Pendant", price: 1299, originalPrice: 1999, slug: "silver-heart-pendant", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 2, name: "Rose Gold Earrings", price: 1499, originalPrice: 2299, slug: "rose-gold-earrings", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 3, name: "Infinity Bracelet", price: 999, originalPrice: 1499, slug: "infinity-bracelet", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 4, name: "Butterfly Ring", price: 899, originalPrice: 1299, slug: "butterfly-ring", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
]

const trendingProducts = [
  { id: 5, name: "Crystal Necklace", price: 1899, originalPrice: 2499, slug: "crystal-necklace", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 6, name: "Pearl Earrings", price: 1299, originalPrice: 1999, slug: "pearl-earrings", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 7, name: "Floral Ring", price: 999, originalPrice: 1499, slug: "floral-ring", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
  { id: 8, name: "Chain Bracelet", price: 1199, originalPrice: 1699, slug: "chain-bracelet", image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533" },
]

const shopByCategory = [
  { name: "Rings", slug: "rings" },
  { name: "Earrings", slug: "earrings" },
  { name: "Necklaces", slug: "necklaces" },
  { name: "Bracelets", slug: "bracelets" },
]

const weAreGiva = [1, 2, 3, 4]

const featuredCollections = [
  { name: "Gold Plated", slug: "gold-plated" },
  { name: "Silver", slug: "silver" },
  { name: "Rose Gold", slug: "rose-gold" },
  { name: "Zircon", slug: "zircon" },
]

const curatedItems = [
  { id: 1, name: "For Her" },
  { id: 2, name: "For Him" },
  { id: 3, name: "Wedding" },
  { id: 4, name: "Gifts" },
]