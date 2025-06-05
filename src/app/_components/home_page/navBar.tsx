import React from "react";
import { Button } from "@/components/ui/button";
import ReelReadyIcon from "./reel-ready-icon";
import Link from "next/link";

export const NavBar = () => {
    return (
        <header className="m-3 p-3 rounded-full fixed top-0 z-40 border-b border-white/10 bg-transparent backdrop-blur-lg supports-[backdrop-filter]:bg-background/10">
            <div className="gap-4 container flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href="/" className="flex items-center space-x-2 group">
                        {/* <ReelReadyIcon /> */}
                        <span className="font-display font-bold tracking-tighter text-xl">ClipCraft</span>
                    </a>
                </div>
                <div className="flex items-center justify-center gap-2 m-2">
                    <nav className="hidden md:flex space-x-10 m-2">
                        <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</a>
                        <a href="#showcase" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Showcase</a>
                        <a href="#pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Pricing</a>
                    </nav>
                    <div className=" flex items-center gap-4">
                        <Link href={'/create'}>
                            <Button className="rounded-full tracking-tighter hover:cursor-pointer bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white border-0">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar