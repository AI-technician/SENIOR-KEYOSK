import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { useUserStore, PracticeMode } from '../store/userStore';
import { motion } from 'motion/react';

export function ModeSelect() {
  const navigate = useNavigate();
  const { setMode, setCurrentStep } = useUserStore();

  useEffect(() => {
    setCurrentStep('mode');
  }, [setCurrentStep]);

  const handleSelect = (mode: PracticeMode) => {
    setMode(mode);
    navigate('/kiosk/menu');
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 px-8 flex flex-col">
      <TopBar title="연습 모드 선택" />
      
      <div className="flex-1 flex flex-col items-center justify-center gap-12 max-w-5xl mx-auto w-full">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('practice')}
          className="w-full bg-[#1A1A1A] border-4 border-[#6F3FF5] rounded-[40px] p-12 text-left hover:bg-[#2A2A2A] transition-colors shadow-[0_0_50px_rgba(111,63,245,0.2)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-6xl font-bold text-white">연습 모드</h2>
            <span className="bg-[#6F3FF5] text-white px-6 py-3 rounded-full text-2xl font-bold">추천</span>
          </div>
          <p className="text-4xl text-[#D9D9D9] leading-relaxed break-keep">
            음성 안내와 힌트가 제공됩니다.<br />처음이신 분들께 추천합니다.
          </p>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('real')}
          className="w-full bg-[#1A1A1A] border-4 border-transparent hover:border-[#B59BFF] rounded-[40px] p-12 text-left hover:bg-[#2A2A2A] transition-colors"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-6xl font-bold text-white">실전 모드</h2>
          </div>
          <p className="text-4xl text-[#D9D9D9] leading-relaxed break-keep">
            실제 키오스크와 똑같이 진행됩니다.<br />충분히 연습하신 후 도전해보세요.
          </p>
        </motion.button>
      </div>

      <VoiceGuide stepId="mode" />
    </div>
  );
}
