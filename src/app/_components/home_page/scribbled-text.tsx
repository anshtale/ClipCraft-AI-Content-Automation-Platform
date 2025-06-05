import React from "react";
import { cn } from "@/lib/utils";

interface ScribbledTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ScribbledText({ children, className }: ScribbledTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10 opacity-50 line-through text-white/60">{children}</span>
      <svg 
        className="absolute -bottom-0.5 left-0 w-full h-6 text-pink-500 z-0"
        viewBox="0 0 100 24" 
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0,12 Q20,17 30,5 T62,12 T100,8" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export default ScribbledText;