import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/sections/Footer';

// Extended project data
const allProjects = [
  {
    id: 1,
    title: 'Nexus Interface',
    description: 'A decentralized dashboard for Web3 analytics with real-time data visualization, portfolio tracking, and seamless wallet integration.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    tags: ['React', 'Three.js', 'Solidity', 'Tailwind'],
    category: 'Web3',
    links: { live: '#', github: '#' },
  },
  {
    id: 2,
    title: 'Cyber Analytics',
    description: 'Enterprise-grade analytics platform with AI-powered insights and predictive modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    category: 'SaaS',
    links: { live: '#', github: '#' },
  },
  {
    id: 3,
    title: 'Neon Commerce',
    description: 'Modern e-commerce platform with immersive 3D product showcases.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'Shopify API', 'Framer Motion', 'Stripe'],
    category: 'E-commerce',
    links: { live: '#', github: '#' },
  },
  {
    id: 4,
    title: 'Quantum Design',
    description: 'Design system and component library for scalable applications.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    tags: ['Storybook', 'TypeScript', 'CSS Modules'],
    category: 'Design System',
    links: { live: '#', github: '#' },
  },
  {
    id: 5,
    title: 'Aether Chat',
    description: 'Real-time messaging platform with end-to-end encryption.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    category: 'SaaS',
    links: { live: '#', github: '#' },
  },
  {
    id: 6,
    title: 'Nova Portfolio',
    description: 'Creative portfolio template with smooth animations and interactions.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    tags: ['Next.js', 'GSAP', 'Tailwind', 'Framer Motion'],
    category: 'Template',
    links: { live: '#', github: '#' },
  },
  {
    id: 7,
    title: 'Flux Dashboard',
    description: 'Data visualization dashboard for financial analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'TypeScript', 'Node.js'],
    category: 'SaaS',
    links: { live: '#', github: '#' },
  },
  {
    id: 8,
    title: 'Prism Gallery',
    description: 'Interactive 3D gallery for showcasing digital art.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
    tags: ['Three.js', 'React', 'WebGL', 'GSAP'],
    category: 'Creative',
    links: { live: '#', github: '#' },
  },
];

const categories = ['All', 'Web3', 'SaaS', 'E-commerce', 'Design System', 'Template', 'Creative'];

function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-xl overflow-hidden border border-border bg-card cursor-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
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
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
          animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        />
        
        {/* Hover actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={project.links.github}
            className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={project.links.live}
            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ExternalLink className="w-5 h-5 text-background" />
          </a>
        </motion.div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
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

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });
  
  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <CustomCursor />
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Header */}
        <div 
          ref={headerRef}
          className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6">All Projects</h1>
            <p className="text-muted-foreground max-w-xl">
              A collection of projects I&apos;ve worked on, ranging from Web3 applications 
              to creative experiments with WebGL.
            </p>
          </motion.div>
          
          {/* Filter */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Filter className="w-4 h-4 text-muted-foreground mr-2 self-center" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-hover ${
                  activeCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Projects Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
}
