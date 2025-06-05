import React from "react";
import { cn } from "@/lib/utils";

interface TiltedTextProps {
  children: React.ReactNode;
  className?: string;
  degree?: number;
}

export function TiltedText({ children, className, degree = -6 }: TiltedTextProps) {
  return (
    <span 
      className={cn("inline-block font-semibold text-pink-500", className)}
      style={{ transform: `rotate(${degree}deg)` }}
    >
      {children}
    </span>
  );
}

export default TiltedText;