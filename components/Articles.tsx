import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, MessageCircle, ExternalLink, Calendar } from 'lucide-react';

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  public_reactions_count: number;
  comments_count: number;
  published_at: string;
  tag_list: string[];
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=shahdeep")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Take first 4 articles as per request
          setArticles(data.slice(0, 4));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch articles", err);
        setLoading(false);
      });
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section id="articles" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-azure-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Writing about cloud architecture, automation, and cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] hover:border-azure-400 dark:hover:border-azure-500/30 transition-all group"
            >
              {/* Image Section */}
              <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                {article.cover_image ? (
                  <img 
                    src={article.cover_image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <BookOpen className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.published_at).toLocaleDateString()}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tag_list.map(tag => (
                    <span key={tag} className="text-xs font-medium text-azure-600 dark:text-azure-400 bg-azure-50 dark:bg-azure-900/30 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-azure-600 dark:group-hover:text-azure-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                  {article.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {article.public_reactions_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {article.comments_count}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-azure-600 dark:text-azure-400 font-medium">
                    Read More <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <a 
                href="https://dev.to/shahdeep" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-azure-500 hover:text-azure-500 dark:hover:text-azure-400 transition-all shadow-sm dark:shadow-none"
            >
                <BookOpen className="w-4 h-4" />
                View All Articles
            </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;