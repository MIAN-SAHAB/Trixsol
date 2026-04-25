"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "Tell us a bit more about your project" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 bg-[#0a0a0a] rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">

          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

          {/* Text Content */}
          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              READY TO <br/> <span className="text-gradient-accent italic">ELEVATE?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
              Let&apos;s build a digital experience that positions your brand as an industry authority.
            </p>

            <div className="space-y-6">
                <div>
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-1">Email Us</p>
                    <a href="mailto:hello@trixsol.com" className="text-2xl text-white font-bold hover:text-accent transition-colors">hello@trixsol.com</a>
                </div>
                <div>
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-1">Call Us</p>
                    <a href="tel:+1234567890" className="text-2xl text-white font-bold hover:text-accent transition-colors">+1 (234) 567-890</a>
                </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 relative z-10">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border border-accent/30"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
                <p className="text-gray-400">We will get back to you within 24 hours to discuss your project.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider font-mono">Name</label>
                    <input
                      {...register("name")}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider font-mono">Email</label>
                    <input
                      {...register("email")}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider font-mono">Project Budget (Optional)</label>
                    <select
                      {...register("budget")}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-gray-400 focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                        <option value="">Select a range</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k+">$50k+</option>
                    </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-wider font-mono">Project Details</label>
                  <textarea
                    {...register("message")}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors min-h-[150px] resize-none"
                    placeholder="Tell us about your vision..."
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="premium"
                    size="xl"
                    className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}