import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const PricingSection = () => {
  return (
    <section id="pricing" className="flex justify-center py-24 bg-gradient-to-br from-slate-900 via-slate-900/95 to-purple-900/20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Simple, transparent pricing
          </h2>
          <p className="text-white/70">
            Start for free, upgrade when you need more power. No hidden fees.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col h-full">
              <h3 className="font-display text-xl font-bold text-white mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold text-white">$0</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-6">Perfect for casual creators just getting started</p>

              <Button className="mb-8 bg-white/10 hover:bg-white/20 text-white">Get Started</Button>

              <div className="space-y-4 mt-auto">
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">5 videos per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">720p export quality</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">Basic templates</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl bg-gradient-to-b from-violet-500/20 to-pink-500/20 border border-white/20 p-8 flex flex-col relative h-full shadow-xl shadow-pink-500/10">
              <Badge className="bg-gradient-to-r from-violet-500 to-pink-500 absolute -top-3 right-8">Popular</Badge>
              <h3 className="font-display text-xl font-bold text-white mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold text-white">$19</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-6">For serious creators ready to grow their audience</p>

              <Button className="mb-8 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0">Choose Plan</Button>

              <div className="space-y-4 mt-auto">
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">Unlimited videos</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">4K export quality</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">All premium templates</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">Advanced AI editing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;