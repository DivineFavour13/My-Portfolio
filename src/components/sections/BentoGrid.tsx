import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Music, 
  Clock, 
  MapPin,
  Code2,
  Globe,
  Cpu,
  Layers,
  Terminal,
  GitBranch,
  ExternalLink
} from 'lucide-react';

// GitHub contribution graph component
function GitHubGraph() {
  const weeks = 26;
  const days = 7;
  
  const getIntensity = () => {
    const rand = Math.random();
    if (rand > 0.8) return 'bg-accent';
    if (rand > 0.6) return 'bg-accent/60';
    if (rand > 0.4) return 'bg-accent/30';
    return 'bg-muted/30';
  };
  
  return (
    <div className="flex gap-1">
      {[...Array(weeks)].map((_, week) => (
        <div key={week} className="flex flex-col gap-1">
          {[...Array(days)].map((_, day) => (
            <div
              key={day}
              className={`w-2.5 h-2.5 rounded-sm ${getIntensity()} transition-all duration-300 hover:scale-125`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Tech stack icons
const techStack = [
  { name: 'Next.js', icon: Globe },
  { name: 'React', icon: Code2 },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Tailwind', icon: Cpu },
  { name: 'React Three Fiber', icon: Layers },
  { name: 'Git', icon: GitBranch },
];

// Current time hook
function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return time;
}

// Spotify track type
interface SpotifyTrack {
  isPlaying: boolean;
  title: string | null;
  artist?: string;
  albumArt?: string | null;
  songUrl?: string;
}

// Live Spotify card
function SpotifyCard({ delay }: { delay: number }) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data: SpotifyTrack = await res.json();
        setTrack(data);
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    // Poll every 30 seconds
    const interval = setInterval(fetchTrack, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden card-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Album art background blur */}
      {track?.albumArt && (
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center scale-110 blur-xl"
          style={{ backgroundImage: `url(${track.albumArt})` }}
        />
      )}

      <div className="relative p-6">
        {loading ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-4">
            {/* Album art or fallback icon */}
            <a
              href={track?.songUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group/art"
            >
              {track?.albumArt ? (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={track.albumArt}
                    alt="Album art"
                    className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-300"
                  />
                  {track.isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      {/* Equaliser bars animation */}
                      <div className="flex items-end gap-[2px] h-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-[3px] bg-green-400 rounded-sm"
                            style={{
                              animation: `equalize ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
                              height: `${40 + i * 20}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              )}
            </a>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  {track?.isPlaying ? 'Now Playing' : 'Last Played'}
                </span>
                {track?.isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>

              {track?.title ? (
                <a
                  href={track.songUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1"
                >
                  <h4 className="font-medium truncate group-hover/link:text-accent transition-colors">
                    {track.title}
                  </h4>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                </a>
              ) : (
                <h4 className="font-medium text-muted-foreground">Nothing yet</h4>
              )}

              {track?.artist && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{track.artist}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes equalize {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </motion.div>
  );
}

// Card component
function BentoCard({ 
  children, 
  className = '', 
  delay = 0,
  colSpan = 1,
  rowSpan = 1,
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  colSpan?: number;
  rowSpan?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden card-hover ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const currentTime = useCurrentTime();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]"
        style={{ y: backgroundY }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Profile</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">The Interface</h2>
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* About Card - Large */}
          <BentoCard 
            className="p-6 md:p-8" 
            colSpan={2} 
            rowSpan={2}
            delay={0.1}
          >
            <div className="h-full flex flex-col">
              <span className="text-xs text-muted-foreground tracking-widest uppercase mb-4">About</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Frontend Developer</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                I build fast, responsive web apps with clean UI and smooth interactions. I focus on 
                frontend development using modern tools like Next.js and TypeScript. I care deeply 
                about performance, structure, and user experience — and I enjoy pushing the boundaries 
                of what&apos;s possible on the web through motion and 3D elements.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div>
                  <span className="text-2xl md:text-3xl font-bold">2+</span>
                  <span className="block text-xs text-muted-foreground mt-1">Years Building</span>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-bold">15+</span>
                  <span className="block text-xs text-muted-foreground mt-1">Projects Shipped</span>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-bold">Open</span>
                  <span className="block text-xs text-muted-foreground mt-1">To Freelance</span>
                </div>
              </div>
            </div>
          </BentoCard>
          
          {/* Quote Card */}
          <BentoCard className="p-6 flex flex-col justify-between" delay={0.2}>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Mantra</span>
            <blockquote className="text-lg md:text-xl font-medium leading-snug">
              &ldquo;Build simple. Make it work. Then make it smooth.&rdquo;
            </blockquote>
            <cite className="text-xs text-muted-foreground not-italic">— Divine Favour</cite>
          </BentoCard>
          
          {/* Spotify Card - Live */}
          <SpotifyCard delay={0.25} />
          
          {/* Availability Card */}
          <BentoCard className="p-6" delay={0.3}>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Availability</span>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-2xl font-bold font-mono">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Africa/Lagos'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Lagos, Nigeria</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-500">Available for work</span>
              </div>
            </div>
          </BentoCard>
          
          {/* Social Links Card */}
          <BentoCard className="p-6" delay={0.35}>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Connect</span>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { icon: Twitter, label: 'X', href: 'https://x.com/favour61514' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/divine-favour-ugochukwu-947329388/' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/DivineFavour13' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors cursor-hover group"
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </BentoCard>
          
          {/* GitHub Activity Card - Wide */}
          <BentoCard className="p-6" colSpan={2} delay={0.4}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub Activity</span>
              </div>
              <span className="text-xs text-muted-foreground">Active contributions · Last year</span>
            </div>
            <GitHubGraph />
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-muted/30" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent/30" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent/60" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
              </div>
              <span>More</span>
            </div>
          </BentoCard>
          
          {/* Tech Stack Card - Wide */}
          <BentoCard className="p-6" colSpan={2} delay={0.45}>
            <span className="text-xs text-muted-foreground tracking-widest uppercase mb-4 block">Tech Stack</span>
            <p className="text-sm text-muted-foreground mb-6">
              Primarily building within the React ecosystem — with a focus on Next.js, TypeScript, and interactive UI.
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-background/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-hover"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </BentoCard>
          
        </div>
      </div>
    </section>
  );
}
