"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-32 pb-10 overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Top Huge CTA */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              LET&apos;S BUILD <br />
              <span className="text-gradient-accent italic">SOMETHING</span> <br />
              GREAT.
            </h2>
          </div>
          <Button variant="premium" size="xl" className="magnetic group flex items-center gap-2">
            Contact Us
            <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </Button>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-t border-white/10 pt-16">
          <div className="md:col-span-1">
             <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter text-white">
                TRIX<span className="text-accent">SOL</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              A premium digital agency crafting cinematic experiences and high-conversion websites for global brands.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Work', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'UI/UX Design', '3D Interactive', 'SEO & Conversion'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'Instagram'].map((network, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-black transition-all magnetic text-xs">
                  {network[0]}
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:border-accent w-full" />
                <button className="bg-accent text-black px-4 py-2 rounded-r-md text-sm font-bold hover:bg-accent/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© {currentYear} Trixsol Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Background large text */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
        <h1 className="text-[20vw] font-black tracking-tighter whitespace-nowrap">TRIXSOL</h1>
      </div>
    </footer>
  );
}