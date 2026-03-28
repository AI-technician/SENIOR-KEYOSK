import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function TopBar({ title, showBack = true, onBack }: TopBarProps) {
  const navigate = useNavigate();
  const { isVoiceEnabled, toggleVoice } = useUserStore();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-28 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-4">
        {showBack && (
          <Button variant="ghost" size="lg" onClick={handleBack} className="w-24 h-20 p-0">
            <ChevronLeft size={48} />
          </Button>
        )}
        <Button variant="ghost" size="lg" onClick={handleHome} className="w-24 h-20 p-0">
          <Home size={40} />
        </Button>
      </div>

      {title && <h1 className="text-4xl font-bold text-white">{title}</h1>}

      <div className="flex items-center gap-4">
        <Button
          variant={isVoiceEnabled ? 'primary' : 'outline'}
          size="lg"
          onClick={toggleVoice}
          className="h-20 px-6 gap-3"
        >
          {isVoiceEnabled ? <Volume2 size={36} /> : <VolumeX size={36} />}
          <span className="text-2xl">{isVoiceEnabled ? '음성 켜짐' : '음성 꺼짐'}</span>
        </Button>
      </div>
    </header>
  );
}
