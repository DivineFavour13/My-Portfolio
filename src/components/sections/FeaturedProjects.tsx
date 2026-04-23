import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Luxora',
    description: 'A modern e-commerce storefront for fashion, beauty, and lifestyle products. Features dynamic product pages, brand stores, wishlist, cart, and an admin dashboard.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=800&fit=crop',
    tags: ['React', 'Vite', 'JavaScript', 'CSS'],
    featured: true,
    links: {
      live: 'https://luxora-rust-gamma.vercel.app',
      github: 'https://github.com/DivineFavour13/Luxora',
    },
  },
  {
    id: 2,
    title: 'Movie Catalog',
    description: 'A clean movie discovery app that lets users browse, search, and explore films with a user-friendly interface powered by a movie database API.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind', 'API'],
    featured: false,
    links: {
      live: 'https://movie-catalog-cyan.vercel.app',
      github: 'https://github.com/DivineFavour13/movie-catalog',
    },
  },
  {
    id: 3,
    title: 'Dev Portfolio',
    description: 'This portfolio — built with React, TypeScript, and Framer Motion. Features a 3D wireframe head, live Spotify integration, and smooth scroll animations.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    featured: false,
    links: {
      live: 'https://divinefavour-portfolio.netlify.app',
      github: 'https://github.com/DivineFavour13/My-Portfolio',
    },
  },
  {
    id: 4,
    title: 'UI Component Library',
    description: 'A personal collection of reusable UI components and design patterns built with React and Tailwind CSS — optimized for speed and consistency across projects.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['React', 'Tailwind', 'TypeScript'],
    featured: false,
    links: {
      live: '#',
      github: '#',
    },
  },
];

function FeaturedProjectCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden border border-border bg-card group cursor-hover"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(30%)',
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-medium">
          Featured Project
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-4 right-4 flex gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {project.links.github !== '#' && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.live !== '#' && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          {project.links.live !== '#' && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors group/link">
              View Live
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.links.github !== '#' && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden border border-border bg-card group cursor-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(40%)',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
          animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.links.github !== '#' && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.links.live !== '#' && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition-transform">
                  <ExternalLink className="w-5 h-5 text-background" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">{tag}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <div>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Work</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Featured Projects</h2>
          </div>
          <a href="/projects"
            className="inline-flex items-center gap-2 mt-4 md:mt-0 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-hover">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {featuredProject && (
          <div className="mb-8">
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
