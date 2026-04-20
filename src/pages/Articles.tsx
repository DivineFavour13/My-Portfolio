import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/sections/Footer';

// Article data
const articles = [
  {
    id: 1,
    title: 'Building Performant 3D Experiences with React Three Fiber',
    excerpt: 'Learn how to create stunning 3D web experiences while maintaining 60fps performance across all devices. We explore optimization techniques, lazy loading, and best practices.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    category: 'WebGL',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Frontend: AI-Assisted Development',
    excerpt: 'Exploring how AI tools are reshaping the way we write, debug, and ship code. From Copilot to ChatGPT, the landscape is changing rapidly.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
    category: 'AI',
    featured: false,
  },
  {
    id: 3,
    title: 'Design Systems at Scale: Lessons from the Trenches',
    excerpt: 'Practical insights on building and maintaining design systems that grow with your organization. Component architecture, documentation, and team collaboration.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'Design',
    featured: false,
  },
  {
    id: 4,
    title: 'Mastering CSS Grid and Flexbox',
    excerpt: 'A comprehensive guide to modern CSS layout techniques. Learn when to use Grid vs Flexbox and how to create complex responsive layouts.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop',
    date: 'Nov 15, 2024',
    readTime: '12 min read',
    category: 'CSS',
    featured: false,
  },
  {
    id: 5,
    title: 'TypeScript Best Practices in 2024',
    excerpt: 'Level up your TypeScript skills with these advanced patterns and techniques. From generics to type guards, we cover it all.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    date: 'Nov 5, 2024',
    readTime: '9 min read',
    category: 'TypeScript',
    featured: false,
  },
  {
    id: 6,
    title: 'The Art of Animation on the Web',
    excerpt: 'Creating delightful animations that enhance user experience without sacrificing performance. A deep dive into Framer Motion and GSAP.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop',
    date: 'Oct 22, 2024',
    readTime: '7 min read',
    category: 'Animation',
    featured: false,
  },
];

function ArticleCard({ article, index, variant = 'default' }: { 
  article: typeof articles[0]; 
  index: number;
  variant?: 'default' | 'featured';
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const isFeatured = variant === 'featured';
  
  return (
    <motion.article
      ref={cardRef}
      className={`group relative rounded-xl overflow-hidden border border-border bg-card cursor-hover ${
        isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href={`/articles/${article.id}`} className="block">
        <div className={`flex ${isFeatured ? 'flex-col md:flex-row' : 'flex-col'}`}>
          {/* Image */}
          <div className={`relative overflow-hidden ${isFeatured ? 'md:w-1/2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}`}>
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                {article.category}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className={`p-6 md:p-8 flex flex-col justify-center ${isFeatured ? 'md:w-1/2' : ''}`}>
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            
            {/* Title */}
            <h3 className={`font-semibold mb-3 group-hover:text-accent transition-colors ${
              isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {article.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {article.excerpt}
            </p>
            
            {/* Read more link */}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
              Read article
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export default function ArticlesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });
  
  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);
  
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Blog</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6">Articles</h1>
            <p className="text-muted-foreground max-w-xl">
              Thoughts on frontend development, design systems, and the future of the web. 
              I write about things I learn and discover along the way.
            </p>
          </motion.div>
        </div>
        
        {/* Articles Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured article */}
            {featuredArticle && (
              <ArticleCard article={featuredArticle} index={0} variant="featured" />
            )}
            
            {/* Other articles */}
            {otherArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index + 1} />
            ))}
          </div>
          
          {/* Load more placeholder */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button className="px-6 py-3 border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-300 cursor-hover">
              Load more articles
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
}
