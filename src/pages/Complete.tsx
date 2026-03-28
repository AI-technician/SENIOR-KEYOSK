import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Complete() {
  const navigate = useNavigate();
  const { clearCart, setCurrentStep } = useUserStore();

  useEffect(() => {
    setCurrentStep('complete');
    // Clear cart after a short delay so the total amount could be shown if needed
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);
    return () => clearTimeout(timer);
  }, [clearCart, setCurrentStep]);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6F3FF5] blur-[150px] opacity-20 rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#B59BFF] blur-[150px] opacity-20 rounded-full" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="z-10 flex flex-col items-center text-center max-w-4xl w-full"
      >
        <div className="w-64 h-64 bg-[#6F3FF5] rounded-full flex items-center justify-center mb-16 shadow-[0_0_80px_rgba(111,63,245,0.5)]">
          <CheckCircle2 size={120} className="text-white" />
        </div>
        
        <h1 className="text-8xl font-bold text-white mb-12 leading-tight break-keep">
          주문이 완료되었습니다!
        </h1>
        
        <p className="text-5xl text-[#D9D9D9] mb-24 leading-relaxed break-keep">
          참 잘하셨습니다.<br />이제 실제 카페에서도<br />자신 있게 주문해보세요.
        </p>

        <div className="flex flex-col gap-8 w-full max-w-2xl">
          <Button
            size="2xl"
            onClick={handleHome}
            className="w-full h-32 text-4xl shadow-[0_0_40px_rgba(111,63,245,0.4)]"
          >
            처음으로 돌아가기
          </Button>
        </div>
      </motion.div>

      <VoiceGuide stepId="complete" />
    </div>
  );
}
