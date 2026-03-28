import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { motion } from 'motion/react';

export function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCurrentStep } = useUserStore();

  useEffect(() => {
    setCurrentStep('confirm');
  }, [setCurrentStep]);

  const method = location.state?.method || 'card';
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleConfirm = () => {
    navigate('/kiosk/complete');
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col items-center justify-center">
      <TopBar title="최종 확인" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1A1A1A] rounded-[60px] p-16 max-w-4xl w-full text-center border-4 border-[#6F3FF5] shadow-[0_0_80px_rgba(111,63,245,0.3)]"
      >
        <h2 className="text-7xl font-bold text-white mb-12 break-keep leading-tight">
          이대로 결제할까요?
        </h2>
        
        <div className="bg-black/50 rounded-[40px] p-12 mb-16">
          <div className="text-4xl text-gray-400 mb-6">총 결제 금액</div>
          <div className="text-8xl font-bold text-[#B59BFF]">{totalAmount.toLocaleString()}원</div>
          <div className="text-3xl text-white mt-8 bg-white/10 inline-block px-8 py-4 rounded-full">
            {method === 'card' ? '신용카드 결제' : method === 'simple' ? '간편결제' : '현금결제'}
          </div>
        </div>

        <div className="flex gap-8 justify-center">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate(-1)}
            className="w-64 h-32 text-4xl border-white/20 text-white"
          >
            아니오
          </Button>
          <Button
            size="2xl"
            onClick={handleConfirm}
            className="w-96 h-32 text-5xl"
          >
            네, 결제할게요
          </Button>
        </div>
      </motion.div>

      <VoiceGuide stepId="confirm" />
    </div>
  );
}
