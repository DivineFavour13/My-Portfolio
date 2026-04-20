import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WireframeHead from '../3d/WireframeHead';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  
  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-[#050505] to-[#020202]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* 3D Head Canvas - Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]">
          <WireframeHead />
        </div>
      </div>
      
      {/* Content Layer */}
      <motion.div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20"
        style={{ y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen py-20">
          
          {/* Left Column - Intro Text */}
          <motion.div 
            className="lg:col-span-3 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[280px]">
              I build fast, responsive web apps with clean UI and smooth interactions — where performance meets craft.
            </p>
            
            {/* Social Icons */}
            <motion.div 
              className="flex gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { label: 'X', href: 'https://x.com/favour61514' },
                { label: 'In', href: 'https://www.linkedin.com/in/divine-favour-ugochukwu-947329388/' },
                { label: 'GH', href: 'https://github.com/DivineFavour13' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xs font-medium text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-300 cursor-hover"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Center Column - Empty for 3D head */}
          <div className="lg:col-span-4 order-1 lg:order-2 hidden lg:block" />
          
          {/* Right Column - Name & Title */}
          <motion.div 
            className="lg:col-span-5 order-3 lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[320px] lg:ml-auto mb-8">
              Merging design thinking with engineering precision to build digital experiences that don&apos;t just look great — they perform effortlessly.
            </p>
            
            {/* Name - Large Typography */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none">
                <span className="block">Divine</span>
                <span className="block text-muted-foreground">Favour</span>
              </h1>
            </motion.div>
            
            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-background transition-all duration-300 cursor-hover group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom info bar */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-end">
          <div className="text-xs text-muted-foreground">
            <span className="block">Frontend Developer</span>
            <span className="block">Lagos, NG</span>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            <span className="block">Open to</span>
            <span className="block text-accent">Freelance & Collaborations</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
