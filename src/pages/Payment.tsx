import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { motion } from 'motion/react';

export function Payment() {
  const navigate = useNavigate();
  const { cart, setCurrentStep } = useUserStore();

  useEffect(() => {
    setCurrentStep('payment');
  }, [setCurrentStep]);

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handlePayment = (method: string) => {
    navigate('/kiosk/confirm', { state: { method } });
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col">
      <TopBar title="결제 방식 선택" />
      
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full flex flex-col items-center justify-center gap-12">
        <h2 className="text-6xl font-bold text-white mb-8 text-center break-keep">
          어떻게 결제하시겠습니까?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePayment('card')}
            className="bg-[#1A1A1A] border-4 border-transparent hover:border-[#6F3FF5] rounded-[40px] p-12 flex flex-col items-center gap-8 transition-colors shadow-lg"
          >
            <div className="w-40 h-40 bg-[#6F3FF5]/20 rounded-full flex items-center justify-center">
              <CreditCard size={80} className="text-[#6F3FF5]" />
            </div>
            <h3 className="text-5xl font-bold text-white">신용카드</h3>
            <p className="text-2xl text-gray-400 text-center">가장 많이 쓰는<br/>결제 방식입니다</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePayment('simple')}
            className="bg-[#1A1A1A] border-4 border-transparent hover:border-[#B59BFF] rounded-[40px] p-12 flex flex-col items-center gap-8 transition-colors shadow-lg"
          >
            <div className="w-40 h-40 bg-[#B59BFF]/20 rounded-full flex items-center justify-center">
              <Smartphone size={80} className="text-[#B59BFF]" />
            </div>
            <h3 className="text-5xl font-bold text-white">간편결제</h3>
            <p className="text-2xl text-gray-400 text-center">삼성페이, 카카오페이 등<br/>스마트폰 결제입니다</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePayment('cash')}
            className="bg-[#1A1A1A] border-4 border-transparent hover:border-gray-500 rounded-[40px] p-12 flex flex-col items-center gap-8 transition-colors shadow-lg"
          >
            <div className="w-40 h-40 bg-gray-500/20 rounded-full flex items-center justify-center">
              <Banknote size={80} className="text-gray-400" />
            </div>
            <h3 className="text-5xl font-bold text-white">현금결제</h3>
            <p className="text-2xl text-gray-400 text-center">직원에게 직접<br/>결제하는 방식입니다</p>
          </motion.button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-8">
          <div className="text-4xl text-white font-bold">
            결제할 금액
          </div>
          <div className="text-6xl font-bold text-[#B59BFF]">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
      </div>

      <VoiceGuide stepId="payment" />
    </div>
  );
}
