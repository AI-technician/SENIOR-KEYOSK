import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useAdminStore } from '../store/adminStore';
import { useUserStore, OrderItem } from '../store/userStore';
import { cn } from '../lib/utils';
import { Minus, Plus } from 'lucide-react';

export function Options() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAdminStore();
  const { addToCart, setCurrentStep } = useUserStore();
  
  const product = products.find((p) => p.id === id);
  
  const [temp, setTemp] = useState<'hot' | 'ice'>('ice');
  const [size, setSize] = useState<'tall' | 'grande' | 'venti'>('tall');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCurrentStep('product');
  }, [setCurrentStep]);

  if (!product) return null;

  const sizePrices = { tall: 0, grande: 500, venti: 1000 };
  const basePrice = product.price + sizePrices[size];
  const totalPrice = basePrice * quantity;

  const handleAdd = () => {
    const item: OrderItem = {
      id: Date.now().toString(),
      product,
      options: {
        temperature: temp,
        size,
        shot: 0,
        syrup: 0,
      },
      quantity,
      totalPrice,
    };
    addToCart(item);
    navigate('/kiosk/menu');
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col">
      <TopBar title="옵션 선택" />
      
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        <div className="flex gap-12 mb-12">
          <div className="w-1/3 aspect-square rounded-3xl overflow-hidden bg-white/5">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-6xl font-bold text-white mb-6 break-keep">{product.name}</h2>
            <p className="text-3xl text-gray-400 mb-8">{product.description}</p>
            <p className="text-5xl font-bold text-[#B59BFF]">{basePrice.toLocaleString()}원</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-[#1A1A1A] rounded-[40px] p-10 mb-8">
          <h3 className="text-4xl font-bold text-white mb-8">온도 선택</h3>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setTemp('hot')}
              className={cn(
                'h-32 rounded-3xl text-4xl font-bold transition-colors border-4',
                temp === 'hot'
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-transparent border-white/20 text-white hover:bg-white/5'
              )}
            >
              따뜻하게 (HOT)
            </button>
            <button
              onClick={() => setTemp('ice')}
              className={cn(
                'h-32 rounded-3xl text-4xl font-bold transition-colors border-4',
                temp === 'ice'
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-transparent border-white/20 text-white hover:bg-white/5'
              )}
            >
              차갑게 (ICE)
            </button>
          </div>
        </div>

        {/* Size */}
        <div className="bg-[#1A1A1A] rounded-[40px] p-10 mb-8">
          <h3 className="text-4xl font-bold text-white mb-8">크기 선택</h3>
          <div className="grid grid-cols-3 gap-6">
            {(['tall', 'grande', 'venti'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  'h-32 rounded-3xl text-3xl font-bold transition-colors border-4 flex flex-col items-center justify-center gap-2',
                  size === s
                    ? 'bg-[#6F3FF5] border-[#6F3FF5] text-white'
                    : 'bg-transparent border-white/20 text-white hover:bg-white/5'
                )}
              >
                <span>{s === 'tall' ? '기본' : s === 'grande' ? '큰 사이즈' : '가장 큰 사이즈'}</span>
                {sizePrices[s] > 0 && <span className="text-xl opacity-80">(+{sizePrices[s]}원)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-[#1A1A1A] rounded-[40px] p-10 mb-8 flex items-center justify-between">
          <h3 className="text-4xl font-bold text-white">수량</h3>
          <div className="flex items-center gap-8">
            <Button
              variant="outline"
              size="lg"
              className="w-24 h-24 rounded-full border-white/20 text-white"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={40} />
            </Button>
            <span className="text-6xl font-bold text-white w-20 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="lg"
              className="w-24 h-24 rounded-full border-white/20 text-white"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={40} />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-8">
          <div className="text-5xl font-bold text-white">
            총 <span className="text-[#B59BFF]">{totalPrice.toLocaleString()}</span>원
          </div>
        </div>
        
        <div className="flex gap-6">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate(-1)}
            className="w-64 h-24 text-4xl border-white/20 text-white"
          >
            취소
          </Button>
          <Button
            size="2xl"
            onClick={handleAdd}
            className="w-80 h-24 text-4xl"
          >
            장바구니 담기
          </Button>
        </div>
      </div>

      <VoiceGuide stepId="product" />
    </div>
  );
}
