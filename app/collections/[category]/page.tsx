// 'use client';

// import { useState, useEffect } from 'react';
// import { Filter, ChevronDown, X } from 'lucide-react';
// import { useInView } from 'react-intersection-observer';
// import ProductCard from '@/app/components/ProductCard';

// // Mock filter options
// const filters = {
//   price: [
//     { id: 'under-1500', name: 'Under ₹1,500', value: [0, 1500] },
//     { id: '1500-3000', name: '₹1,500 - ₹3,000', value: [1500, 3000] },
//     { id: '3000-5000', name: '₹3,000 - ₹5,000', value: [3000, 5000] },
//     { id: 'above-5000', name: 'Above ₹5,000', value: [5000, Infinity] }
//   ],
//   metal: [
//     { id: 'silver', name: '925 Silver' },
//     { id: 'gold', name: 'Gold Plated' },
//     { id: 'rose-gold', name: 'Rose Gold' },
//     { id: 'oxidised', name: 'Oxidised Silver' }
//   ],
//   style: [
//     { id: 'classic', name: 'Classic' },
//     { id: 'modern', name: 'Modern' },
//     { id: 'ethnic', name: 'Ethnic' },
//     { id: 'minimalist', name: 'Minimalist' }
//   ],
//   occasion: [
//     { id: 'daily', name: 'Daily Wear' },
//     { id: 'party', name: 'Party Wear' },
//     { id: 'office', name: 'Office Wear' },
//     { id: 'festive', name: 'Festive Wear' }
//   ]
// };

// // Mock products data
// import { products as productsData } from '@/app/data/products';

// interface Option {
//   id: string;
//   name: string;
// }


// export default function CollectionPage({ params }: { params: { category: string } }) {

//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
//   const [products, setProducts] = useState(productsData);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const { ref, inView } = useInView();

//   const toggleFilter = (category: string, value: string) => {
//     setSelectedFilters(prev => {
//       const current = prev[category] || [];
//       const updated = current.includes(value)
//         ? current.filter(v => v !== value)
//         : [...current, value];
      
//       return {
//         ...prev,
//         [category]: updated
//       };
//     });
//   };

//   const clearFilters = () => {
//     setSelectedFilters({});
//   };

//   // Load more products when scrolling
//   useEffect(() => {
//     if (inView && hasMore && !loading) {
//       setLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         const newProducts = productsData.slice(products.length, products.length + 12);
//         setProducts(prev => [...prev, ...newProducts]);
//         setLoading(false);
//         if (products.length >= 48) { // Limit to 48 products for demo
//           setHasMore(false);
//         }
//       }, 1000);
//     }
//   }, [inView, hasMore, loading, products.length]);

//   const FilterSection = ({ title, options, category }: { title: string; options: Option[]; category: string }) => (
//     <div className="border-b border-gray-200 py-6">
//       <h3 className="flow-root -my-3">
//         <button
//           type="button"
//           className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
//         >
//           <span className="font-medium text-gray-900">{title}</span>
//           <span className="ml-6 flex items-center">
//             <ChevronDown className="h-5 w-5" />
//           </span>
//         </button>
//       </h3>
//       <div className="pt-6">
//         <div className="space-y-4">
//           {options.map((option) => (
//             <div key={option.id} className="flex items-center">
//               <input
//                 id={option.id}
//                 name={option.id}
//                 type="checkbox"
//                 checked={selectedFilters[category]?.includes(option.id)}
//                 onChange={() => toggleFilter(category, option.id)}
//                 className="h-4 w-4 rounded border-gray-300 text-[#c97f5e] focus:ring-[#c97f5e]"
//               />
//               <label htmlFor={option.id} className="ml-3 text-sm text-gray-600">
//                 {option.name}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white">
//       <div>
//         {/* Mobile filter dialog */}
//         {mobileFiltersOpen && (
//           <div className="relative z-40 lg:hidden">
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//             <div className="fixed inset-0 z-40 flex">
//               <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//                 <div className="flex items-center justify-between px-4">
//                   <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                   <button
//                     type="button"
//                     onClick={() => setMobileFiltersOpen(false)}
//                     className="-mr-2 flex h-10 w-10 items-center justify-center"
//                   >
//                     <X className="h-6 w-6 text-gray-400" />
//                   </button>
//                 </div>

//                 {/* Filters */}
//                 <div className="mt-4 px-4">
//                   <FilterSection title="Price" options={filters.price} category="price" />
//                   <FilterSection title="Metal" options={filters.metal} category="metal" />
//                   <FilterSection title="Style" options={filters.style} category="style" />
//                   <FilterSection title="Occasion" options={filters.occasion} category="occasion" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
//               {params.category.replace(/-/g, ' ')}
//             </h1>

//             <div className="flex items-center">
//               <button
//                 type="button"
//                 onClick={() => setMobileFiltersOpen(true)}
//                 className="lg:hidden text-gray-400 hover:text-gray-500"
//               >
//                 <Filter className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//             {/* Filters */}
//             <div className="hidden lg:block">
//               <div className="sticky top-4 space-y-6">
//                 {Object.keys(selectedFilters).length > 0 && (
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">
//                       {Object.values(selectedFilters).flat().length} filters applied
//                     </span>
//                     <button
//                       onClick={clearFilters}
//                       className="text-sm text-[#c97f5e] hover:text-[#b16d4f]"
//                     >
//                       Clear all
//                     </button>
//                   </div>
//                 )}
//                 <FilterSection title="Price" options={filters.price} category="price" />
//                 <FilterSection title="Metal" options={filters.metal} category="metal" />
//                 <FilterSection title="Style" options={filters.style} category="style" />
//                 <FilterSection title="Occasion" options={filters.occasion} category="occasion" />
//               </div>
//             </div>

//             {/* Product grid */}
//             <div className="lg:col-span-3">
//               <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-8">
//                 {products.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     id={product.id}
//                     name={product.name}
//                     price={product.price}
//                     originalPrice={product.originalPrice}
//                     image={product.image}
//                     images={product.images}
//                     slug={product.slug}
//                     rating={product.rating}
//                     reviewCount={product.reviewCount}
//                     category={product.category}
//                   />
//                 ))}
//               </div>
//               {/* Loading indicator */}
//               {hasMore && (
//                 <div ref={ref} className="flex justify-center mt-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c97f5e]"></div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import CollectionClient from './CollectionClient';

interface PageProps {
  params: any;
}

// Remove `any` and use your own type
export default function Page({ params }: PageProps) {
  return <CollectionClient category={params.category || ''} />;
}
