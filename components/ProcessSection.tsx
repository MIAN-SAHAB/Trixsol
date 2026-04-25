"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your brand, uncovering the core problem and defining a high-conversion strategy.",
  },
  {
    num: "02",
    title: "Cinematic Design",
    desc: "Crafting a premium visual identity with tailored UI/UX that speaks directly to your high-ticket audience.",
  },
  {
    num: "03",
    title: "Heavy Interaction Dev",
    desc: "Bringing the design to life with modern architectures, WebGL, and flawless GSAP animations.",
  },
  {
    num: "04",
    title: "Launch & Growth",
    desc: "Rigorous testing, optimized SEO deployment, and ongoing conversion rate optimization.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-32 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-xl md:text-2xl text-accent font-mono mb-4 tracking-wider uppercase">Our Process</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            HOW WE <span className="text-gradient-accent italic">OPERATE</span>
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent -translate-x-1/2 origin-top"
          />

          {steps.map((step, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24 last:mb-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-black border-2 border-accent rounded-full -translate-x-1/2 z-10" />

              {/* Content */}
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20, x: i % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="glass p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors"
                >
                  <span className="text-accent font-mono text-xl block mb-4">{step.num}</span>
                  <h4 className="text-3xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-gray-400">{step.desc}</p>
                </motion.div>
              </div>

              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}