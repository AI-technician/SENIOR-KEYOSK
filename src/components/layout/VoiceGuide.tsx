import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useVoiceGuide } from '../../hooks/useVoiceGuide';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceGuideProps {
  stepId: string;
}

export function VoiceGuide({ stepId }: VoiceGuideProps) {
  const { isVoiceEnabled } = useUserStore();
  const { play, isPlaying, text } = useVoiceGuide(stepId);

  if (!isVoiceEnabled || !text) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-40 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl"
      >
        <div className="bg-black/80 backdrop-blur-xl border-2 border-[#6F3FF5] rounded-3xl p-8 shadow-[0_10px_40px_rgba(111,63,245,0.3)] flex items-center gap-8">
          <div className="flex-1 text-3xl leading-snug text-white font-medium break-keep">
            {text}
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <Button
              variant="outline"
              size="lg"
              className="h-16 px-6 text-xl gap-2 border-[#B59BFF] text-[#B59BFF]"
              onClick={() => play(1.0)}
              disabled={isPlaying}
            >
              <Play size={24} />
              다시 듣기
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-16 px-6 text-xl gap-2 text-gray-300 bg-white/5"
              onClick={() => play(0.8)}
              disabled={isPlaying}
            >
              <RotateCcw size={24} />
              천천히 듣기
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
