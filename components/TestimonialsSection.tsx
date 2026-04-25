"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export default function TestimonialsSection() {
  // Duplicate for seamless infinite scroll
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="py-32 bg-black overflow-hidden relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
        <h2 className="text-xl md:text-2xl text-accent font-mono mb-4 tracking-wider uppercase">Client Success</h2>
        <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          WHAT THEY <span className="text-gradient-accent italic">SAY</span>
        </h3>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden">
        {/* Left/Right Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 px-4 w-max"
          animate={{ x: [0, -1035] }} // Adjust based on card width
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="w-[400px] glass p-10 rounded-3xl border border-white/10 shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
                <p className="text-xl text-white font-medium leading-relaxed mb-8">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}