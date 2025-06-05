import React from "react";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="m-2 lg:w-full   flex-col bg-slate-900 text-white/70 py-16 border-t border-white/10">
      <div className="container">
        <div className="grid items-center justify-center grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="font-display font-bold text-xl text-white mb-4">ReelReady</h3>
            <p className="mb-6 max-w-xs">Create viral-worthy content in minutes with our AI-powered editing tool.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-pink-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-pink-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} ReelReady. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
            <span className="text-white/40">•</span>
            <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
            <span className="text-white/40">•</span>
            <a href="#" className="hover:text-pink-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;