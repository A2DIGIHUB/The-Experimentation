'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faClock, faShare, faArrowLeft, faDownload, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { publications, Publication } from '@/data/publications';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticlePDF from '@/components/ArticlePDF';
import { useRouter } from 'next/navigation';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Publication | null>(null);
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
    } else {
      // Redirect to articles page if article not found
      router.push('/articles');
    }
  }, [params.id, router]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading article...</h1>
          <p className="text-gray-600 mb-6">Please wait while we fetch the article.</p>
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
    <article className="min-h-screen bg-white">
      {/* Back to Articles Link - Mobile */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-100 p-2">
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="relative h-[50vh] md:h-[70vh] bg-gray-900">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
            {/* Back to Articles Link - Desktop */}
            <div className="hidden md:block mb-6">
              <Link 
                href="/articles" 
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                <span>Back to Articles</span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-gray-700 text-gray-100 text-sm rounded-full">
                {readingTime} min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
                <time>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Article Actions */}
        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={toggleBookmark}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FontAwesomeIcon 
              icon={faBookmark} 
              className={isBookmarked ? 'text-blue-600' : ''} 
            />
            <span className="hidden sm:inline">
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FontAwesomeIcon icon={faShare} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <ArticlePDF article={article} />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg md:prose-xl max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="article-content">
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                <Image
                  src={article.authorImage || '/images/default-avatar.png'}
                  alt={article.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{article.author}</h3>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FontAwesomeIcon icon={faShare} />
                <span>Share Article</span>
              </button>
              <ArticlePDF article={article}>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Download</span>
                </button>
              </ArticlePDF>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
