import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'lg' | 'xl' | '2xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'xl', isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#6F3FF5] text-white hover:bg-[#5A33C7] shadow-[0_0_20px_rgba(111,63,245,0.3)] hover:shadow-[0_0_30px_rgba(111,63,245,0.5)]': variant === 'primary',
            'bg-[#B59BFF] text-black hover:bg-[#9A7BE5]': variant === 'secondary',
            'border-2 border-[#6F3FF5] text-[#6F3FF5] hover:bg-[#6F3FF5]/10': variant === 'outline',
            'hover:bg-white/10 text-white': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
            'h-20 px-8 text-2xl': size === 'lg',
            'h-24 px-10 text-3xl': size === 'xl',
            'h-32 px-12 text-4xl': size === '2xl',
          },
          className
        )}
        {...props}
      >
        {isLoading ? <span className="animate-spin mr-2">⏳</span> : null}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
