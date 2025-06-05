import React from "react";
import { Button } from "@/components/ui/button";
import ScribbledText from "./scribbled-text";
import TiltedText from "./tilted-text";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-24 bg-gradient-to-br from-slate-900 to-purple-900/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to create viral reels in minutes?
          </h2>
          
          <p className="text-lg text-white/70 mb-8">
            Join thousands of content creators who are saving time and growing their audience with ReelReady.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/api/auth/signin"
             >
            <Button className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white text-lg py-6 px-8 rounded-xl border-0">
              Get Started For Free
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;