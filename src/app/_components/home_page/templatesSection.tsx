import React from "react";
import { Badge } from "@/components/ui/badge";

export const TemplatesSection = () => {
  return (
    <section id="templates" className="w-full flex flex-col items-center py-24 bg-slate-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-violet-400 border-violet-400/20 bg-violet-400/10">
            Endless Creativity
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Trending templates
          </h2>
          <p className="text-white/70">
            Create content using the same formats as top creators. Just add your footage and our AI does the rest.
          </p>
          {/* New image section */}
          <div className="relative mt-12 mx-auto w-full max-w-2xl">
            <img
              src="/demo_cta.png" // Assuming demo_cta.png is the image you want to use
              alt="Trending Templates Preview"
              className="w-full rounded-xl object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent rounded-xl" />
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default TemplatesSection;