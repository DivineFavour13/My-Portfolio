import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/favour61514' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/divine-favour-ugochukwu-947329388/' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/DivineFavour13' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ctaRef, { once: true, margin: '-100px' });
  const [emailHovered, setEmailHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <footer 
      ref={sectionRef}
      id="contact"
      className="relative pt-20 md:pt-32 pb-8 w-full overflow-hidden"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"
        style={{ y: backgroundY }}
      />
      
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main CTA */}
        <motion.div
          ref={ctaRef}
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-sm text-muted-foreground tracking-widest uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Let&apos;s work together
          </motion.p>
          
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let&apos;s build something
            <br />
            <span className="text-accent glow-text">extraordinary.</span>
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can work together.
          </motion.p>
          
          {/* Email CTA */}
          <motion.a
            href="mailto:Ugochukwudivinefavour8@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent hover:text-background transition-all duration-300 cursor-hover group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <Mail className="w-5 h-5" />
            Ugochukwudivinefavour8@gmail.com
            <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 ${emailHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
          </motion.a>
        </motion.div>
        
        {/* Footer bottom */}
        <motion.div
          className="border-t border-border pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo / Name */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Divine Favour</span>
              <span className="text-muted-foreground">— Frontend Developer</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Lagos, Nigeria</span>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-300 cursor-hover"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Divine Favour Ugochukwu. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors link-underline">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors link-underline">Terms</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
