export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  specs: string[];
  image: string;
  images: string[];
  slug: string;
  category: string;
  tag?: string;
}

export const products: Product[] = [
  {
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
    category: "rings",
    tag: "New"
  },
  {
    id: "2",
    name: "Moonlight Pearl Necklace",
    price: 2499,
    originalPrice: 2999,
    rating: 4.7,
    reviewCount: 128,
    description: "The Moonlight Pearl Necklace features a lustrous freshwater pearl pendant on a delicate sterling silver chain. This timeless piece adds elegance to any outfit and makes for a perfect gift.",
    specs: [
      "Material: 925 Sterling Silver",
      "Pearl: Genuine Freshwater Pearl",
      "Chain Length: 18 inches",
      "Clasp: Lobster Clasp"
    ],
    image: "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
    images: [
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533"
    ],
    slug: "moonlight-pearl-necklace",
    category: "necklaces",
    tag: "Bestseller"
  },
  {
    id: "3",
    name: "Infinity Love Bracelet",
    price: 1799,
    originalPrice: 1999,
    rating: 4.5,
    reviewCount: 94,
    description: "The Infinity Love Bracelet symbolizes eternal love and connection. Crafted from sterling silver with a polished finish, this bracelet features an infinity symbol that makes it a meaningful gift for someone special.",
    specs: [
      "Material: 925 Sterling Silver",
      "Length: Adjustable 6.5-8 inches",
      "Closure: Toggle Clasp",
      "Weight: 4.5 grams"
    ],
    image: "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
    images: [
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533"
    ],
    slug: "infinity-love-bracelet",
    category: "bracelets",
    tag: "Sale"
  },
  {
    id: "4",
    name: "Celestial Star Earrings",
    price: 1599,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 112,
    description: "These Celestial Star Earrings feature delicate star designs with cubic zirconia accents. Perfect for adding a touch of sparkle to your everyday look or for special occasions.",
    specs: [
      "Material: 925 Sterling Silver",
      "Stones: Cubic Zirconia",
      "Backing: Push Back",
      "Length: 1.2 cm"
    ],
    image: "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533",
    images: [
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533",
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533"
    ],
    slug: "celestial-star-earrings",
    category: "earrings",
    tag: "New"
  },
  {
    id: "5",
    name: "Lotus Flower Pendant",
    price: 2199,
    originalPrice: 2599,
    rating: 4.6,
    reviewCount: 87,
    description: "The Lotus Flower Pendant symbolizes purity and spiritual awakening. This intricately designed pendant features a blooming lotus flower in sterling silver with rose gold accents.",
    specs: [
      "Material: 925 Sterling Silver with Rose Gold Plating",
      "Pendant Size: 1.8 cm",
      "Chain Length: 20 inches",
      "Clasp: Spring Ring"
    ],
    image: "https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533",
    images: [
      "https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533",
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533",
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533"
    ],
    slug: "lotus-flower-pendant",
    category: "pendants",
    tag: "Bestseller"
  },
  {
    id: "6",
    name: "Vintage Rose Gold Bangle",
    price: 2899,
    originalPrice: 3299,
    rating: 4.7,
    reviewCount: 76,
    description: "This Vintage Rose Gold Bangle features an elegant design with intricate patterns inspired by vintage jewelry. The rose gold finish adds warmth and sophistication to this timeless piece.",
    specs: [
      "Material: 925 Sterling Silver with Rose Gold Plating",
      "Diameter: 6.5 cm (Standard Size)",
      "Width: 0.6 cm",
      "Weight: 12 grams"
    ],
    image: "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550",
    images: [
      "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550",
      "https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533",
      "https://www.giva.co/cdn/shop/files/PD061_5.jpg?v=1712928583&width=533"
    ],
    slug: "vintage-rose-gold-bangle",
    category: "bangles",
    tag: "Limited Edition"
  },
  {
    id: "7",
    name: "Sapphire Blue Stud Earrings",
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 103,
    description: "These Sapphire Blue Stud Earrings feature brilliant blue cubic zirconia stones set in sterling silver. The classic design makes them perfect for both everyday wear and special occasions.",
    specs: [
      "Material: 925 Sterling Silver",
      "Stone: Blue Cubic Zirconia",
      "Backing: Push Back",
      "Stone Size: 5mm"
    ],
    image: "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
    images: [
      "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550",
      "https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533",
      "https://www.giva.co/cdn/shop/products/PD0526_2.jpg?v=1642164483&width=533"
    ],
    slug: "sapphire-blue-stud-earrings",
    category: "earrings",
    tag: "Sale"
  },
  {
    id: "8",
    name: "Twisted Rope Chain Necklace",
    price: 2299,
    originalPrice: 2599,
    rating: 4.5,
    reviewCount: 68,
    description: "The Twisted Rope Chain Necklace features an intricate twisted design that adds texture and visual interest. This versatile piece can be worn alone or paired with pendants for a personalized look.",
    specs: [
      "Material: 925 Sterling Silver",
      "Length: 20 inches",
      "Width: 2mm",
      "Clasp: Lobster Clasp"
    ],
    image: "https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500",
    images: [
      "https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500",
      "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550",
      "https://www.giva.co/cdn/shop/files/PD02328_5.jpg?v=1706795031&width=533"
    ],
    slug: "twisted-rope-chain-necklace",
    category: "necklaces",
    tag: "New"
  },
  {
    id: "9",
    name: "Emerald Green Cocktail Ring",
    price: 2699,
    originalPrice: 3199,
    rating: 4.9,
    reviewCount: 92,
    description: "This stunning Emerald Green Cocktail Ring features a large emerald-cut cubic zirconia stone surrounded by smaller clear stones. The bold design makes a statement at any special event.",
    specs: [
      "Material: 925 Sterling Silver",
      "Main Stone: Green Cubic Zirconia",
      "Accent Stones: Clear Cubic Zirconia",
      "Ring Size: Adjustable"
    ],
    image: "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
    images: [
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
      "https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500",
      "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550"
    ],
    slug: "emerald-green-cocktail-ring",
    category: "rings",
    tag: "Limited Edition"
  },
  {
    id: "10",
    name: "Minimalist Bar Bracelet",
    price: 1499,
    originalPrice: 1799,
    rating: 4.6,
    reviewCount: 84,
    description: "The Minimalist Bar Bracelet features a sleek horizontal bar on a delicate chain. This simple yet elegant design is perfect for everyday wear and can be easily layered with other bracelets.",
    specs: [
      "Material: 925 Sterling Silver",
      "Bar Length: 3.5 cm",
      "Chain Length: Adjustable 6-8 inches",
      "Closure: Lobster Clasp"
    ],
    image: "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
    images: [
      "https://www.giva.co/cdn/shop/products/PD0478_2.jpg?v=1640960315&width=533",
      "https://www.giva.co/cdn/shop/files/PD01335_5_c8e2a62d-39cf-47db-849f-5f646d47fe5c.jpg?v=1733144485&width=533",
      "https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500",
      "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300"
    ],
    slug: "minimalist-bar-bracelet",
    category: "bracelets",
    tag: "Bestseller"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product?.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product?.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.tag === "New" || product.tag === "Sale").slice(0, 4);
};

export const getTrendingProducts = () => {
  return [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);
}; 
