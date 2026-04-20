import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <div>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Work</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Featured Projects</h2>
          </div>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-hover"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
        
        {/* Coming Soon */}
        <motion.div
          className="flex flex-col items-center justify-center py-32 rounded-2xl border border-dashed border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-5xl mb-6">🚧</span>
          <h3 className="text-2xl font-bold mb-3">Projects Coming Soon</h3>
          <p className="text-muted-foreground text-sm max-w-xs text-center leading-relaxed">
            Currently curating my best work. Check back soon or follow me on GitHub for the latest.
          </p>
          <a
            href="https://github.com/DivineFavour13"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-all duration-300 cursor-hover group"
          >
            <Github className="w-4 h-4" />
            View GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
