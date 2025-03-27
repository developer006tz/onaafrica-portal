import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative">
        {/* Outer circle with gradient */}
        <div className={cn(
          "animate-spin rounded-full border-t-transparent border-4 border-primary",
          "animate-[spin_1.2s_linear_infinite]",
          sizeClasses[size]
        )}></div>
        
        {/* Inner pulse circle */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "rounded-full bg-primary/20",
          "animate-[ping_1.5s_ease-in-out_infinite]",
          size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-6 w-6'
        )}></div>
        
        {/* Center dot */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "rounded-full bg-primary",
          size === 'sm' ? 'h-1 w-1' : size === 'md' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-4 w-4'
        )}></div>
      </div>
      
      {text && (
        <div className="mt-3 text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </div>
      )}
    </div>
  );
}


export function FullPageLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex gap-4">
        <LoadingSpinner size="sm" className="text-chart-1" />
        <LoadingSpinner size="md" className="text-chart-2" />
        <LoadingSpinner size="lg" className="text-chart-3" />
        <LoadingSpinner size="sm" className="text-chart-4" />
      </div>
      <p className="mt-4 text-lg font-medium">Loading amazing content for you...</p>
    </div>
  );
}

export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <LoadingSpinner 
      size="sm" 
      className={cn("inline-block", className)} 
    />
  );
}