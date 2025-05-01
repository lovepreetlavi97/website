"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User,  ChevronRight, ChevronDown} from "lucide-react"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


// Add these interfaces before the menuData definition
interface SubMenuItem {
  title: string;
  path: string;
  submenu?: SubMenuItem[];
}

interface MenuItem {
  title: string;
  path: string;
  submenu?: SubMenuItem[];
}

// Update the menuData type
const menuData: MenuItem[] = [
  {
    title: "Shop by Category",
    path: "/collections/shop",
    submenu: [
      { 
        title: "All",
        path: "/collections/all"
      },
      {
        title: "Rings",
        path: "/collections/rings",
        submenu: [
          { title: "All Rings", path: "/collections/all-rings" },
          { title: "Engagement Rings", path: "/collections/engagement-rings" },
          { title: "Couple Rings", path: "/collections/couple-rings" }
        ]
      },
      {
        title: "Necklaces & Pendants",
        path: "/collections/necklaces",
        submenu: [
          { 
            title: "All Necklaces & Pendants",
            path: "/collections/all-necklaces"
          },
          {
            title: "Shop by Price",
            path: "/collections/necklaces/by-price",
            submenu: [
              { title: "Under 1500", path: "/collections/necklaces/under-1500" },
              { title: "1500 to 3000", path: "/collections/necklaces/1500-3000" },
              { title: "3000 to 5000", path: "/collections/necklaces/3000-5000" },
              { title: "Above 5000", path: "/collections/necklaces/above-5000" }
            ]
          },
          {
            title: "Shop by Metal",
            path: "/collections/necklaces/by-metal",
            submenu: [
              { title: "925 Silver", path: "/collections/necklaces/silver" },
              { title: "Pure Gold", path: "/collections/necklaces/gold" }
            ]
          },
          {
            title: "Shop by Colour",
            path: "/collections/necklaces/by-color",
            submenu: [
              { title: "Silver", path: "/collections/necklaces/silver-color" },
              { title: "Rose Gold", path: "/collections/necklaces/rose-gold" },
              { title: "Gold Plated", path: "/collections/necklaces/gold-plated" },
              { title: "Oxidised Silver", path: "/collections/necklaces/oxidised" }
            ]
          },
          {
            title: "Shop by Style",
            path: "/collections/necklaces/by-style",
            submenu: [
              { title: "Office", path: "/collections/necklaces/office" },
              { title: "Party", path: "/collections/necklaces/party" },
              { title: "Everyday", path: "/collections/necklaces/everyday" }
            ]
          }
        ]
      },
      {
        title: "Bracelets",
        path: "/collections/bracelets",
        submenu: [
          { title: "All Bracelets", path: "/collections/all-bracelets" },
          { title: "Chain Bracelets", path: "/collections/chain-bracelets" },
          { title: "Tennis Bracelets", path: "/collections/tennis-bracelets" }
        ]
      },
      {
        title: "Earrings",
        path: "/collections/earrings",
        submenu: [
          { title: "All Earrings", path: "/collections/all-earrings" },
          { title: "Studs", path: "/collections/studs" },
          { title: "Hoops", path: "/collections/hoops" }
        ]
      },
      { 
        title: "Anklets",
        path: "/collections/anklets"
      },
      {
        title: "Other Categories",
        path: "/collections/others",
        submenu: [
          { title: "Nose Pins", path: "/collections/nose-pins" },
          { title: "Toe Rings", path: "/collections/toe-rings" }
        ]
      }
    ]
  },
  {
    title: "Gold with Lab Diamonds",
    path: "/collections/gold",
    submenu: [
      { title: "Gold Necklaces", path: "/collections/gold-necklaces" },
      { title: "Gold Rings", path: "/collections/gold-rings" },
      { title: "Gold Earrings", path: "/collections/gold-earrings" },
      { title: "Gold Bracelets", path: "/collections/gold-bracelets" },
    ]
  },
  {
    title: "Personalised Jewellery",
    path: "/collections/personalised",
    submenu: [
      { title: "Name Necklaces", path: "/collections/name-necklaces" },
      { title: "Initial Rings", path: "/collections/initial-rings" },
      { title: "Couple Bands", path: "/collections/couple-bands" },
      { title: "Custom Designs", path: "/collections/custom-designs" },
    ]
  },
  {
    title: "Gift Store",
    path: "/collections/gift",
    submenu: [
      { title: "Birthday Gifts", path: "/collections/birthday-gifts" },
      { title: "Anniversary Gifts", path: "/collections/anniversary-gifts" },
      { title: "Wedding Gifts", path: "/collections/wedding-gifts" },
      { title: "Gift Cards", path: "/collections/gift-cards" },
    ]
  },
  {
    title: "Men's Jewellery",
    path: "/collections/mens",
    submenu: [
      { title: "Men's Chains", path: "/collections/mens-chains" },
      { title: "Men's Bracelets", path: "/collections/mens-bracelets" },
      { title: "Men's Rings", path: "/collections/mens-rings" },
      { title: "Cufflinks", path: "/collections/cufflinks" },
    ]
  },
  {
    title: "Latest Collections",
    path: "/collections/latest",
    submenu: [
      { title: "New Arrivals", path: "/collections/new-arrivals" },
      { title: "Trending Now", path: "/collections/trending" },
      { title: "Best Sellers", path: "/collections/best-sellers" },
      { title: "Limited Edition", path: "/collections/limited-edition" },
    ]
  },
  {
    title: "More at GIVA",
    path: "/more",
    submenu: [
      { title: "About Us", path: "/about" },
      { title: "Contact Us", path: "/contact" },
      { title: "Blog", path: "/blog" },
      { title: "Careers", path: "/careers" },
    ]
  }
];

// Update component interfaces
interface DesktopSubmenuProps {
  items: SubMenuItem[];
  parentPath?: string;
}

interface MobileSubmenuProps {
  items: SubMenuItem[];
  level?: number;
  parentPath?: string;
}

export default function Navbar() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { totalItems: wishlistItems } = useSelector((state: RootState) => state.wishlist);


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

  // Desktop submenu component
  const DesktopSubmenu: React.FC<DesktopSubmenuProps> = ({ items, parentPath = '' }) => {
    return (
      <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
        {items.map((item, index) => (
          <div
            key={`${parentPath}-${index}`}
            className="relative group/submenu"
            onMouseEnter={() => setHoveredSubMenu(`${parentPath}-${index}`)}
            onMouseLeave={() => setHoveredSubMenu(null)}
          >
            <Link
              href={item.path}
              className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e] text-gray-700 flex items-center justify-between"
            >
              {item.title}
              {item.submenu && <ChevronRight className="h-4 w-4" />}
            </Link>
            {item.submenu && hoveredSubMenu === `${parentPath}-${index}` && (
              <DesktopSubmenu items={item.submenu} parentPath={`${parentPath}-${index}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Mobile submenu component
  const MobileSubmenu: React.FC<MobileSubmenuProps> = ({ items, level = 0, parentPath = '' }) => {
    return (
      <div className={`pl-${level * 4} pb-3`}>
        {items.map((item, index) => (
          <div key={`${parentPath}-${index}`}>
            <div className="flex justify-between items-center py-2">
              <Link
                href={item.path}
                className="text-gray-600 hover:text-[#c97f5e]"
              >
                {item.title}
              </Link>
              {item.submenu && (
                <button
                  onClick={() => setActiveSubSubMenu(
                    activeSubSubMenu === `${parentPath}-${index}` 
                      ? null 
                      : `${parentPath}-${index}`
                  )}
                  className="p-1"
                >
                  <ChevronRight 
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      activeSubSubMenu === `${parentPath}-${index}` ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              )}
            </div>
            {item.submenu && activeSubSubMenu === `${parentPath}-${index}` && (
              <MobileSubmenu 
                items={item.submenu} 
                level={level + 1} 
                parentPath={`${parentPath}-${index}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[#f8e8e0] text-center py-1 text-xs md:text-sm overflow-hidden">
        <div className="animate-slide">
          <Link href="/collections/all-necklaces" className="underline">Pan India Free Shipping!</Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateY(100%); }
          10% { transform: translateY(0); }
          90% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        .animate-slide {
          animation: slide 3s linear infinite; /* Adjusted duration for better visibility */
        }
      `}</style>

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
                <div className="relative">
                  {wishlistItems > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{wishlistItems}</span>
                  )}
                  <Heart className="h-6 w-6 text-gray-700" />
                </div>
              </Link>
              <Link href="/cart">
                <div className="relative">
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{cartItems?.length}</span>
                  )}
                  <ShoppingBag className="h-6 w-6 text-gray-700" />
                </div>
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
                <div className="relative">
                  {wishlistItems > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{wishlistItems}</span>
                  )}
                  <Heart className="h-6 w-6 text-gray-700" />
                </div>
              </Link>
              <Link href="/cart">
                <div className="relative">
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{cartItems?.length}</span>
                  )}
                  <ShoppingBag className="h-6 w-6 text-gray-700" />
                </div>
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
                {menuData.map((item, index) => (
                  <li key={index} className="border-b border-gray-200">
                    <div className="py-3 flex justify-between items-center">
                      <Link href={item.path}>
                        <span>{item.title}</span>
                      </Link>
                      {item.submenu && (
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                          className="p-1"
                        >
                          <ChevronRight 
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              activeSubmenu === index ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {activeSubmenu === index && item.submenu && (
                      <MobileSubmenu items={item.submenu} parentPath={index.toString()} />
                    )}
                  </li>
                ))}
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
              <Link href="/account/login">
                <h3 className="font-medium text-gray-800">Guest User</h3>
                <p className="text-xs text-gray-600">Tap to Login/Sign up</p>
              </Link>
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
                placeholder="Search 'Gifts For Her'"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none animate-slide-search"
              />
              <button className="absolute right-3 top-2.5">
                <Search className="h-5 w-5 text-gray-500" />
              </button>

            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/account/login" className="flex flex-col items-center text-xs">
                <User className="h-7 w-7" />
                <span>ACCOUNT</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-xs">
                <div className="relative">
                  {wishlistItems > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{wishlistItems}</span>
                  )}
                  <Heart className="h-7 w-7" />
                </div>
                <span>WISHLIST</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-xs">
                <div className="relative">
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] text-[10px] bg-pink-500 text-white rounded-full px-2 py-1">{cartItems?.length}</span>
                  )}
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <span>CART</span>
              </Link>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="container mx-auto mt-4 hidden md:block">
            <ul className="flex justify-center space-x-8 text-sm">
              {menuData.map((item, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link href={item.path} className="hover:text-[#c97f5e] flex items-center gap-1">
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {hoveredMenu === index && item.submenu && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                      {item.submenu.map((subitem, subindex) => (
                        <div
                          key={subindex}
                          className="relative group/submenu"
                          onMouseEnter={() => setHoveredSubMenu(`${index}-${subindex}`)}
                          onMouseLeave={() => setHoveredSubMenu(null)}
                        >
                          <Link
                            href={subitem.path}
                            className="block px-4 py-2 hover:bg-[#f8e8e0] hover:text-[#c97f5e] text-gray-700 flex items-center justify-between"
                          >
                            {subitem.title}
                            {subitem.submenu && <ChevronRight className="h-4 w-4" />}
                          </Link>
                          {subitem.submenu && hoveredSubMenu === `${index}-${subindex}` && (
                            <DesktopSubmenu items={subitem.submenu} parentPath={`${index}-${subindex}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Dropdown */}
          <div className={`absolute top-full left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[calc(100vh-4rem)] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
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
                {menuData.map((item, index) => (
                  <li key={index} className="border-b border-gray-200">
                    <div className="py-3 flex justify-between items-center">
                      <Link href={item.path}>
                        <span>{item.title}</span>
                      </Link>
                      {item.submenu && (
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                          className="p-1"
                        >
                          <ChevronRight 
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              activeSubmenu === index ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {activeSubmenu === index && item.submenu && (
                      <MobileSubmenu items={item.submenu} parentPath={index.toString()} />
                    )}
                  </li>
                ))}
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