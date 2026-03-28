import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, setCurrentStep } = useUserStore();

  useEffect(() => {
    setCurrentStep('cart');
  }, [setCurrentStep]);

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col items-center justify-center">
        <TopBar title="장바구니" />
        <h2 className="text-5xl font-bold text-white mb-12">장바구니가 비어있습니다.</h2>
        <Button size="2xl" onClick={() => navigate('/kiosk/menu')} className="w-80 h-24 text-4xl">
          메뉴 고르기
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col">
      <TopBar title="장바구니 확인" />
      
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        <h2 className="text-5xl font-bold text-white mb-12">주문하실 메뉴를 확인해주세요</h2>
        
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#1A1A1A] rounded-[40px] p-8 flex items-center gap-8 border border-white/10"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black/50 shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-white mb-4">{item.product.name}</h3>
                  <p className="text-2xl text-gray-400">
                    {item.options.temperature === 'hot' ? '따뜻하게' : '차갑게'} / 
                    {item.options.size === 'tall' ? ' 기본 크기' : item.options.size === 'grande' ? ' 큰 크기' : ' 가장 큰 크기'}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-4 shrink-0">
                  <div className="text-4xl font-bold text-[#B59BFF]">
                    {item.totalPrice.toLocaleString()}원
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold text-white bg-white/10 px-6 py-2 rounded-full">
                      수량 {item.quantity}개
                    </span>
                    <Button
                      variant="danger"
                      size="lg"
                      className="w-16 h-16 p-0 rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={28} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-8">
          <div className="text-4xl text-white font-bold">
            총 <span className="text-[#B59BFF]">{cart.length}</span>개
          </div>
          <div className="text-5xl font-bold text-white">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
        
        <div className="flex gap-6">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate('/kiosk/menu')}
            className="w-64 h-24 text-4xl border-white/20 text-white"
          >
            더 고르기
          </Button>
          <Button
            size="2xl"
            onClick={() => navigate('/kiosk/payment')}
            className="w-80 h-24 text-4xl"
          >
            결제하기
          </Button>
        </div>
      </div>

      <VoiceGuide stepId="cart" />
    </div>
  );
}
