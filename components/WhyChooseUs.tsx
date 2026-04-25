"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
  { label: "Awards Won", value: 24, suffix: "" },
  { label: "Global Reach", value: 15, suffix: " Countries" },
];

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = from;
      const duration = 2000;
      const increment = to / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          clearInterval(timer);
          setCount(to);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, from, to]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Content */}
            <div className="lg:w-1/2">
                <h2 className="text-xl md:text-2xl text-accent font-mono mb-4 tracking-wider uppercase">Why Us</h2>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
                    WE DON&apos;T <br/><span className="text-gradient-accent italic">COMPROMISE</span>
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                    We combine high-end design aesthetics with robust engineering to create digital experiences that not only look spectacular but also perform flawlessly and convert consistently.
                </p>
                <ul className="space-y-4 text-white font-medium">
                    {['Bespoke Custom Designs', 'Heavy yet Performant Animations', 'Conversion-Optimized Architecture', 'Scalable Modern Tech Stack'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Stats Grid */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-8 md:gap-16">
                {stats.map((stat, i) => (
                    <div key={i}>
                        <Counter from={0} to={stat.value} suffix={stat.suffix} />
                        <p className="text-gray-400 font-mono uppercase tracking-widest text-sm mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
}