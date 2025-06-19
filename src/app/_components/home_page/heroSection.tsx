import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScribbledText from "./scribbled-text";
import TiltedText from "./tilted-text";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Link from "next/link";

export const HeroSection = () => {
    return (
        <section className="w-full flex flex-col items-center relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16">
            {/* Background gradient */}
            <div
                className="max-w-full absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-20 z-0"
                aria-hidden="true"
            />

            {/* Animated patterns */}
            <div className="max-w-full absolute top-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full filter blur-3xl opacity-10 animate-float" aria-hidden="true"></div>
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full filter blur-3xl opacity-10 animate-float delay-700" aria-hidden="true"></div>

            <div className="container relative z-10">
                <div className="hidden lg:flex items-center justify-center">
                    <Badge variant="outline" className="mb-6 py-1.5 backdrop-blur-sm bg-white/10 border-white/20 text-white/80 mx-auto">
                        <div className="text-xs tracking-tighter flex">Start creating viral reels today</div>
                    </Badge>

                </div>

                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex font-display tracking-tighter text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-200 items-center justify-center gap-1">
                        <div>
                            Create
                        </div>
                        <div className="m-0.5">
                            <ContainerTextFlip
                                words={["viral", "trending", "awesome"]}
                            />
                        </div>
                    </div>

                    <div className="items-center tracking-tighter justify-center flex font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
                        <div className="flex tracking-tighter font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-300 items-center justify-center gap-2">
                            reels in
                            <span className="relative tracking-tighter text-4xl md:text-5xl lg:text-6xl xl:text-7xl inline-block bg-gradient-to-r from-orange-300 to-orange-400 text-transparent bg-clip-text">
                                minutes
                                <svg
                                    className="absolute top-full left-0 w-full h-12 mt-1"
                                    viewBox="0 0 300 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 8C25 1 45 5 65 3C85 1 105 -1 125 1C145 3 165 7 185 5C205 3 225 -1 245 1C265 3 285 7 295 5"
                                        stroke="#FF6B35"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M8 18C28 11 48 15 68 13C88 11 108 9 128 11C148 13 168 17 188 15C208 13 228 9 248 11C268 13 288 17 298 15"
                                        stroke="#FF6B35"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        fill="none"
                                        opacity="0.8"
                                    />
                                    <path
                                        d="M3 28C23 21 43 25 63 23C83 21 103 19 123 21C143 23 163 27 183 25C203 23 223 19 243 21C263 23 283 27 293 25"
                                        stroke="#FF6B35"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        fill="none"
                                        opacity="0.6"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <p className="text-sm tracking-tighter text-white/70 max-w-2xl mx-auto mb-8">
                        Forget manual editing. Let our AI do the heavy lifting so you can focus on creating content that goes viral, not spending hours editing.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">

                        <Link href={'/api/auth/signin'}>
                            <Button className="hover:cursor-pointer w-full sm:w-auto bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 tracking-tighter text-white text-lg py-6 px-8 animate-pulse-glow rounded-xl">
                                Start Creating For Free
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-muted-foreground">No credit card required • Free plan available</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;