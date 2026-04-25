"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Ensure GSAP is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 1,
      },
    });

    tl.fromTo(
      words,
      { opacity: 0.1 },
      { opacity: 1, stagger: 0.1, duration: 1, ease: "none" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const storyText = "We don't just build websites. We engineer premium digital experiences that elevate brands, build authority, and drive serious conversions. Every pixel has a purpose. Every motion tells a story.";

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-xl md:text-2xl text-accent font-mono mb-12 tracking-wider uppercase">The Vision</h2>

            <div ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white flex flex-wrap gap-x-4 gap-y-2">
                {storyText.split(" ").map((word, index) => (
                    <span key={index} className="word opacity-10">
                        {word}
                    </span>
                ))}
            </div>
        </div>
    </section>
  );
}