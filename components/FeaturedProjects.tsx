"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="work" className="relative bg-background pt-32 pb-10">
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-xl md:text-2xl text-accent font-mono mb-4 tracking-wider uppercase">Featured Work</h2>
        <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter max-w-3xl">
          SELECTED <span className="text-gradient-accent italic">PROJECTS</span>
        </h3>
      </div>

      <div className="relative mt-20">
        {projectsData.map((project, i) => {
          const targetScale = 1 - (projectsData.length - i) * 0.05;
          return (
            <ProjectCard
                key={project.id}
                project={project}
                i={i}
                progress={scrollYProgress}
                range={[i * .25, 1]}
                targetScale={targetScale}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-32">
        <button className="px-10 py-5 rounded-full border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 magnetic group flex items-center gap-4">
            View All Work
            <span className="group-hover:rotate-45 transition-transform"><ArrowUpRight /></span>
        </button>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, i, progress, range, targetScale }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-12 pb-10">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative flex flex-col md:flex-row w-full max-w-7xl h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl origin-top"
      >
        {/* Content Side */}
        <div className="w-full md:w-1/3 p-10 md:p-16 flex flex-col justify-between relative z-10 bg-gradient-to-b from-[#111] to-black">
            <div>
                <span className="text-sm font-mono tracking-widest uppercase" style={{ color: project.color }}>
                    {project.category}
                </span>
                <h3 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tighter">
                    {project.title}
                </h3>
                <p className="text-gray-400 mt-6 text-lg">
                    {project.description}
                </p>
            </div>

            <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 mt-8 md:mt-0">
                <ArrowUpRight size={28} />
            </button>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-2/3 h-full relative overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/20" />
        </div>
      </motion.div>
    </div>
  );
};