import React from 'react';
import { Product } from '../../store/adminStore';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onClick: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onClick, className }: ProductCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(product)}
      className={cn(
        'relative flex flex-col items-center bg-[#1A1A1A] rounded-3xl p-6 border-2 border-transparent hover:border-[#6F3FF5] transition-all shadow-lg overflow-hidden group',
        className
      )}
    >
      {product.isPopular && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold z-10">
          인기
        </div>
      )}
      {product.isRecommended && (
        <div className="absolute top-4 left-4 bg-[#6F3FF5] text-white px-4 py-2 rounded-full text-lg font-bold z-10">
          추천
        </div>
      )}
      {product.isSoldOut && (
        <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-4xl font-bold bg-red-600 px-8 py-4 rounded-2xl transform -rotate-12">
            품절
          </span>
        </div>
      )}
      
      <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-black/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-3 text-center break-keep leading-tight">
        {product.name}
      </h3>
      <p className="text-[#B59BFF] text-3xl font-bold mt-auto">
        {product.price.toLocaleString()}원
      </p>
    </motion.button>
  );
}
