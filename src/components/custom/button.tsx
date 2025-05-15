import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export function CustomButton({
  className,
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'py-2 px-4 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-[#24E5C6] hover:bg-[#20d6b8] text-white',
        variant === 'outline' && 'border border-[#24E5C6] text-[#24E5C6] hover:bg-[#24E5C6]/10',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
