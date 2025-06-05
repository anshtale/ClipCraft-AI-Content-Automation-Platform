import React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="justify-center flex py-20 bg-slate-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-pink-400 border-pink-400/20 bg-pink-400/10">
            Lighting Fast Results
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            ReelReady magic in action
          </h2>
          <p className="text-white/70">
            Transform ordinary footage into engaging, viral-worthy content with just one click
          </p>
        </div>
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-slate-950">
                <img
                    src="/lovable-uploads/d21c583f-936f-43c9-90e1-5d7f0a74cf22.png"
                    alt="ReelReady showcase video preview"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-4">
                    <Badge className="bg-pink-500 mb-2">Before</Badge>
                    <p className="text-white text-sm">Raw footage without ReelReady</p>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-600/20 to-pink-600/20 p-1 rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-slate-950">
                <img
                    src="/lovable-uploads/2f8ffdc4-66ee-449e-b1eb-c1309097e050.png"
                    alt="ReelReady enhanced video"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-4">
                    <Badge className="bg-gradient-to-r from-violet-600 to-pink-600 mb-2">After</Badge>
                    <p className="text-white text-sm">AI-enhanced with captions, effects & trimming</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;