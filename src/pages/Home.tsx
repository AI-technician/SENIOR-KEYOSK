import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { motion } from 'motion/react';

export function Home() {
  const navigate = useNavigate();
  const { clearCart, setVoiceEnabled, setCurrentStep } = useUserStore();
  const { play } = useVoiceGuide('home');

  useEffect(() => {
    clearCart();
    setCurrentStep('home');
  }, [clearCart, setCurrentStep]);

  const handleStart = (withVoice: boolean) => {
    setVoiceEnabled(withVoice);
    navigate('/mode-select');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=2000&auto=format&fit=crop")' }}
      />
      
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6F3FF5] blur-[150px] opacity-20 rounded-full z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#B59BFF] blur-[150px] opacity-20 rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center max-w-4xl w-full"
      >
        <div className="w-48 h-48 bg-[#6F3FF5] rounded-full flex items-center justify-center mb-12 shadow-[0_0_60px_rgba(111,63,245,0.5)]">
          <span className="text-white text-6xl font-bold">NYJ</span>
        </div>
        
        <h1 className="text-7xl font-bold text-white mb-8 leading-tight break-keep">
          남양주 어르신<br />키오스크 연습센터
        </h1>
        
        <p className="text-4xl text-[#D9D9D9] mb-24 leading-relaxed break-keep">
          카페에서 키오스크로 음료를 주문하는 방법을<br />천천히 따라하며 연습해보세요.
        </p>

        <div className="flex flex-col gap-8 w-full max-w-2xl">
          <Button
            size="2xl"
            onClick={() => handleStart(true)}
            className="w-full h-32 text-4xl shadow-[0_0_40px_rgba(111,63,245,0.4)]"
          >
            음성안내와 함께 시작하기
          </Button>
          
          <Button
            variant="outline"
            size="2xl"
            onClick={() => handleStart(false)}
            className="w-full h-32 text-4xl border-4"
          >
            조용히 연습 시작하기
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/board')}
            className="w-full h-20 text-2xl text-gray-400 hover:text-white"
          >
            공지사항 및 교육자료 보기
          </Button>
        </div>

        <button
          onClick={() => navigate('/admin')}
          className="absolute top-8 right-8 text-white/20 hover:text-white/50 transition-colors"
        >
          관리자
        </button>
      </motion.div>
    </div>
  );
}
