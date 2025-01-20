'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faClock, faShare, faArrowLeft, faDownload, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { publications } from '@/data/publications';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticlePDFLink } from '@/components/ArticlePDF';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [readingTime, setReadingTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Find article by string ID
    const currentArticle = publications.find(p => p.id === params.id);
    
    if (currentArticle) {
      setArticle(currentArticle);
      // Calculate reading time (assuming 200 words per minute)
      const wordCount = currentArticle.content.split(' ').length;
      setReadingTime(Math.ceil(wordCount / 200));
    }
  }, [params.id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // You can implement actual bookmark storage logic here
  };

  return (
    <article className="article-page">
      <header className="article-header">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="article-header-image"
          priority
        />
        <div className="article-header-overlay" />
        <div className="article-container relative z-10 h-full flex flex-col justify-end pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              {article.category}
            </span>
            <div className="article-meta">
              <div className="article-meta-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <time>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="article-meta-item">
                <FontAwesomeIcon icon={faUser} />
                <span>{article.author}</span>
              </div>
              <div className="article-meta-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {article.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-700"
          >
            {article.excerpt}
          </motion.p>
        </div>
      </header>

      <div className="article-container">
        <div className="article-sidebar">
          <div className="article-actions">
            <button 
              onClick={toggleBookmark}
              className={`article-action-button ${isBookmarked ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button onClick={handleShare} className="article-action-button">
              <FontAwesomeIcon icon={faShare} />
              <span>Share</span>
            </button>
            <ArticlePDFLink article={article} />
          </div>
        </div>

        <div className="article-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 {...props} className="text-3xl font-bold mb-6" />,
              h2: ({node, ...props}) => <h2 {...props} className="text-2xl font-bold mb-4" />,
              h3: ({node, ...props}) => <h3 {...props} className="text-xl font-bold mb-3" />,
              p: ({node, ...props}) => <p {...props} className="mb-4" />,
              ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside mb-4" />,
              ol: ({node, ...props}) => <ol {...props} className="list-decimal list-inside mb-4" />,
              li: ({node, ...props}) => <li {...props} className="mb-2" />,
              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
              blockquote: ({node, ...props}) => <blockquote {...props} />,
              code: ({node, className, children, ...props}: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return isInline ? (
                  <code {...props} className={className}>
                    {children}
                  </code>
                ) : (
                  <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
                    <code {...props} className={className}>
                      {children}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        <footer className="article-footer">
          <div className="article-tags">
            <span className="text-sm text-gray-600">Related Topics:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Maternal Health', 'Healthcare', 'Africa', 'Research'].map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="article-nav">
            <Link href="/articles" className="article-nav-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to Articles</span>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
