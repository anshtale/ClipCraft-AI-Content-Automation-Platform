import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export const SocialProofSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-12 bg-slate-900/50 backdrop-blur">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Avatar key={i} className="border-2 border-background w-10 h-10">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <p className="text-white/70 text-center max-w-lg">
            <span className="text-gradient font-medium">Trusted by over 1,000+ creators</span> worldwide to create viral-worthy content in minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;