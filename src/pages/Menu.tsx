import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { useAdminStore, Product } from '../store/adminStore';
import { useUserStore } from '../store/userStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Menu() {
  const navigate = useNavigate();
  const { categories, products } = useAdminStore();
  const { cart, setCurrentStep } = useUserStore();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      if (idleTime >= 10) {
        setCurrentStep('category_idle');
      } else {
        setCurrentStep('category_with_items');
      }
    } else {
      setCurrentStep('category');
    }
  }, [cart.length, idleTime, setCurrentStep]);

  useEffect(() => {
    if (cart.length === 0) return;

    const timer = setInterval(() => {
      setIdleTime((prev) => prev + 1);
    }, 1000);

    const resetIdleTime = () => setIdleTime(0);
    window.addEventListener('click', resetIdleTime);
    window.addEventListener('touchstart', resetIdleTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener('click', resetIdleTime);
      window.removeEventListener('touchstart', resetIdleTime);
    };
  }, [cart.length]);

  const filteredProducts = products.filter((p) => p.categoryId === activeCategory);
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleProductClick = (product: Product) => {
    if (product.isSoldOut) return;
    navigate(`/kiosk/options/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col">
      <TopBar title="메뉴 선택" />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Categories */}
        <div className="w-64 bg-[#111] border-r border-white/10 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'w-full text-left px-8 py-10 text-3xl font-bold transition-colors border-b border-white/5',
                activeCategory === cat.id
                  ? 'bg-[#6F3FF5] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                  className="h-[450px]"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-8">
          <div className="text-4xl text-white font-bold">
            총 <span className="text-[#B59BFF]">{cart.length}</span>개
          </div>
          <div className="text-5xl font-bold text-white">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
        
        <Button
          size="2xl"
          disabled={cart.length === 0}
          onClick={() => navigate('/kiosk/cart')}
          className="w-80 h-24 text-4xl"
        >
          결제하기
        </Button>
      </div>

      <VoiceGuide stepId={cart.length > 0 ? (idleTime >= 10 ? 'category_idle' : 'category_with_items') : 'category'} />
    </div>
  );
}
