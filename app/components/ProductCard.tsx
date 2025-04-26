"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  id: any;
  name: any;
  price: any;
  originalPrice: any,
  image: any;
  slug: any;
}

export default function ProductCard({ id, name, price, originalPrice, image, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group" key={id}>
      <div className="overflow-hidden rounded-lg bg-white">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
          />
          <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-600 hover:text-pink-500">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-1">{name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-medium text-pink-600">₹{price}</span>
            <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 