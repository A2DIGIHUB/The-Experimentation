'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Link href={`/articles/${article.id}`}>
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {format(parseISO(article.date), 'MMM d, yyyy')}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-primary-blue transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{article.author}</span>
                </div>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
