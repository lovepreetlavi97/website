export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cherry Blossom Silver Ring",
    price: 1999,
    originalPrice: 2499,
    image: "https://www.giva.co/cdn/shop/files/R0714_5.jpg?v=1711627202&width=533",
    slug: "cherry-blossom-silver-ring",
    category: "rings",
    isFeatured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: "2",
    name: "Pearl Drop Earrings",
    price: 2299,
    originalPrice: 2899,
    image: "https://www.giva.co/cdn/shop/files/E0836_W-1_1.jpg?v=1711623578&width=533",
    slug: "pearl-drop-earrings",
    category: "earrings",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: "3",
    name: "Rose Gold Chain Necklace",
    price: 3499,
    originalPrice: 3999,
    image: "https://www.giva.co/cdn/shop/files/N0832_R-1_1.jpg?v=1711623655&width=533",
    slug: "rose-gold-chain-necklace",
    category: "necklaces",
    isFeatured: true,
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: "4",
    name: "Silver Lotus Bracelet",
    price: 1799,
    originalPrice: 2199,
    image: "https://www.giva.co/cdn/shop/files/B0361_4.jpg?v=1711627219&width=533",
    slug: "silver-lotus-bracelet",
    category: "bracelets",
    isFeatured: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: "5",
    name: "Diamond Pendant Necklace",
    price: 4999,
    originalPrice: 5999,
    image: "https://www.giva.co/cdn/shop/files/P0434_6.jpg?v=1711623682&width=533",
    slug: "diamond-pendant-necklace",
    category: "necklaces",
    rating: 4.9,
    reviewCount: 215
  },
  {
    id: "6",
    name: "Gold Bangle Set",
    price: 3799,
    originalPrice: 4299,
    image: "https://www.giva.co/cdn/shop/files/B0345_4.jpg?v=1711627073&width=533",
    slug: "gold-bangle-set",
    category: "bracelets",
    isNew: true,
    rating: 4.7,
    reviewCount: 63
  },
  {
    id: "7",
    name: "Emerald Stud Earrings",
    price: 2699,
    originalPrice: 3199,
    image: "https://www.giva.co/cdn/shop/files/E0841_Y_front_1.jpg?v=1711623651&width=533",
    slug: "emerald-stud-earrings",
    category: "earrings",
    rating: 4.8,
    reviewCount: 92
  },
  {
    id: "8",
    name: "Silver Infinity Ring",
    price: 1599,
    originalPrice: 1999,
    image: "https://www.giva.co/cdn/shop/files/R0713_1.jpg?v=1711623662&width=533",
    slug: "silver-infinity-ring",
    category: "rings",
    rating: 4.5,
    reviewCount: 117
  }
]; 