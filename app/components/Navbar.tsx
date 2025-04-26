"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, ChevronLeft, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileExpandedMenu = () => {
    setIsMobileMenuExpanded(!isMobileMenuExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[#f8e8e0] text-center py-1 text-xs md:text-sm">
        Pan India Free Shipping!
      </div>

      {/* Mobile Navbar - Collapsed State */}
      {isMobileView && !isMobileMenuExpanded && (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="flex items-center">
              {/* Menu Button */}
              <button onClick={toggleMobileExpandedMenu} className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-serif font-bold">GIVA</span>
                <span className="text-xs align-top">♦</span>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/wishlist">
                <Heart className="h-6 w-6 text-gray-700" />
              </Link>
              <Link href="/cart">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-2 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 'Gifts For Her'"
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none text-sm"
              />
              <button className="absolute right-3 top-2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navbar - Expanded Menu */}
      {isMobileView && isMobileMenuExpanded && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto sticky">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <button onClick={toggleMobileExpandedMenu} className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold">GIVA</span>
              <span className="text-xs align-top">♦</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/wishlist">
                <Heart className="h-6 w-6 text-gray-700" />
              </Link>
              <Link href="/cart">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 bg-white border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 'Gifts For Her'"
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none text-sm"
              />
              <button className="absolute right-3 top-2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-4 py-1 bg-gray-50">
            <nav>
              <ul className="flex flex-col text-sm text-gray-700">
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Shop by Category</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Gold with Lab Diamonds</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Personalised Jewellery</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Gift Store</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Men's Jewellery</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>Latest Collections</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="py-3 border-b border-gray-200 flex justify-between items-center">
                  <span>More at GIVA</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              </ul>
            </nav>
          </div>

          {/* User Account */}
          <div className="px-4 py-4 bg-pink-100 mt-auto">
            <div className="flex items-center">
              <div className="bg-pink-500 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Guest User</h3>
                <p className="text-xs text-gray-600">Tap to Login/Sign up</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      {!isMobileView && (
        <header className="bg-white py-4 px-4 md:px-8 shadow-sm relative sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-bold">
              <span className="font-serif">GIVA</span>
              <span className="text-xs align-top">♦</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex relative w-1/3">
              <input
                type="text"
                placeholder="Search Pendants"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
              />
              <button className="absolute right-3 top-2.5">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/account" className="flex flex-col items-center text-xs">
                <User className="h-7 w-7" />
                <span>ACCOUNT</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-xs">
                <Heart className="h-7 w-7" />
                <span>WISHLIST</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-xs">
                <ShoppingBag className="h-7 w-7" />
                <span>CART</span>
              </Link>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="container mx-auto mt-4 hidden md:block">
            <ul className="flex justify-center space-x-8 text-sm">
              <li><Link href="/shop" className="hover:text-[#c97f5e]">Shop by Category</Link></li>
              <li><Link href="/gold" className="hover:text-[#c97f5e]">Gold with Lab Diamonds</Link></li>
              <li><Link href="/personalised" className="hover:text-[#c97f5e]">Personalised Jewellery</Link></li>
              <li><Link href="/gift" className="hover:text-[#c97f5e]">Gift Store</Link></li>
              <li><Link href="/mens" className="hover:text-[#c97f5e]">Men's Jewellery</Link></li>
              <li><Link href="/collections" className="hover:text-[#c97f5e]">Latest Collections</Link></li>
              <li><Link href="/more" className="hover:text-[#c97f5e]">More at GIVA</Link></li>
            </ul>
          </nav>

          {/* Mobile Menu Dropdown */}
          <div className={`absolute top-full left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[calc(100vh-4rem)] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
            {/* Search Bar Mobile */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Pendants"
                  className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
                />
                <button className="absolute right-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Menu - Mobile */}
            <nav className="py-2">
              <ul className="flex flex-col text-sm">
                <li><Link href="/shop" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Shop by Category</Link></li>
                <li><Link href="/gold" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Gold with Lab Diamonds</Link></li>
                <li><Link href="/personalised" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Personalised Jewellery</Link></li>
                <li><Link href="/gift" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Gift Store</Link></li>
                <li><Link href="/mens" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Men's Jewellery</Link></li>
                <li><Link href="/collections" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">Latest Collections</Link></li>
                <li><Link href="/more" className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e]">More at GIVA</Link></li>
              </ul>
            </nav>

            {/* Icons - Mobile */}
            <div className="flex justify-around py-4 border-t border-gray-100">
              <Link href="/account" className="flex flex-col items-center text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>ACCOUNT</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>WISHLIST</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>CART</span>
              </Link>
            </div>
          </div>
        </header>
      )}
    </header>
  );
} 