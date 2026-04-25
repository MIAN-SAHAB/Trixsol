"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Code, Paintbrush, Rocket, Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Web Development",
    description: "High-performance, scalable, and secure web applications built with modern architectures like Next.js and React.",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/0",
  },
  {
    title: "UI/UX Design",
    description: "Cinematic, conversion-focused interfaces that captivate users and elevate your brand's digital presence.",
    icon: Paintbrush,
    color: "from-purple-500/20 to-pink-500/0",
  },
  {
    title: "3D & Interactive",
    description: "Immersive WebGL experiences and heavy animations using Three.js and GSAP for that 'wow' factor.",
    icon: Layers,
    color: "from-emerald-500/20 to-teal-500/0",
  },
  {
    title: "SEO & Growth",
    description: "Technical SEO and conversion rate optimization to ensure your beautiful site also drives revenue.",
    icon: Rocket,
    color: "from-orange-500/20 to-red-500/0",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;

    const wrapper = scrollWrapperRef.current;

    // We want to scroll horizontally based on the width of the wrapper minus the viewport width
    let ctx = gsap.context(() => {
        gsap.to(wrapper, {
            x: () => -(wrapper.scrollWidth - window.innerWidth + 100), // padding
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: () => `+=${wrapper.scrollWidth}`,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="h-screen bg-black flex flex-col justify-center overflow-hidden relative border-t border-white/5">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-12 shrink-0">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
          OUR <span className="text-gradient-accent italic">EXPERTISE</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl">
          Comprehensive digital solutions tailored for high-ticket brands.
        </p>
      </div>

      <div className="pl-6 md:pl-12 w-full overflow-visible">
        <div ref={scrollWrapperRef} className="flex gap-8 w-max pb-12 pt-4 pr-[20vw]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className={`w-[350px] md:w-[450px] h-[400px] rounded-2xl border border-white/10 bg-gradient-to-br ${service.color} glass p-8 flex flex-col relative group overflow-hidden`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-6 text-[120px] font-black text-white/5 leading-none pointer-events-none group-hover:text-white/10 transition-colors duration-500">
                  0{index + 1}
                </span>

                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-auto bg-black/50 backdrop-blur-md text-accent">
                  <Icon size={24} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-3">
                    {service.description}
                  </p>

                  <button className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider group/btn magnetic">
                    Explore
                    <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover/btn:bg-accent transition-colors">
                        <ArrowUpRight size={16} />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}