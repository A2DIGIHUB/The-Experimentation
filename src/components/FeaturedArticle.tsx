'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-64 md:h-full min-h-[400px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary-blue text-white text-sm font-medium rounded-full">
              Featured
            </span>
            <span className="text-sm text-gray-500">
              {format(parseISO(article.date), 'MMMM d, yyyy')}
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 hover:text-primary-blue transition-colors">
            <Link href={`/articles/${article.id}`}>
              {article.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-6">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <p className="font-medium">{article.author}</p>
                <p className="text-sm text-gray-500">{article.category}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{article.readTime}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
