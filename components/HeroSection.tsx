"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

function ParticleBackground(props: any) {
  const ref = useRef<any>(null);
  // 5000 particles randomly spread in a sphere (length must be multiple of 3)
  const sphere = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const headlineText = "WE CRAFT DIGITAL EXCELLENCE";
  const chars = headlineText.split("");

  useEffect(() => {
    if (!headlineRef.current) return;

    gsap.to(headlineRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.5,
    });
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/10 glass text-sm font-medium tracking-wide uppercase text-accent"
        >
          Premium Digital Agency
        </motion.div>

        <h1
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-[120px] font-black leading-[0.9] tracking-tighter text-white mb-8 max-w-6xl flex flex-wrap justify-center"
        >
          {chars.map((char, index) => (
            <span
              key={index}
              style={{
                opacity: 0,
                transform: "translateY(50px)",
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
        >
          Elevating brands through cinematic storytelling, heavy interactive animations, and high-conversion design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button variant="premium" size="xl" className="magnetic">
            View Our Work
          </Button>
          <Button variant="outline" size="xl" className="magnetic border-white/20 text-white hover:bg-white/5">
            Book Consultation
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gray-800 overflow-hidden relative">
          <motion.div
            className="w-full h-full bg-accent"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}