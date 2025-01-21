'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { publications, Publication } from '@/data/publications';
import ArticleCard from '@/components/ArticleCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';

interface ArticleProps {
  article: Publication;
}

function ArticleList() {
  const searchParams = useSearchParams();
  const [filteredArticles, setFilteredArticles] = useState(publications);
  const category = searchParams?.get('category')?.toLowerCase();
  const searchTerm = searchParams?.get('searchTerm')?.toLowerCase();

  useEffect(() => {
    let filtered = [...publications];
    if (category) {
      filtered = filtered.filter(pub => pub.category.toLowerCase() === category);
    }
    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.excerpt.toLowerCase().includes(searchTerm) ||
        pub.author.toLowerCase().includes(searchTerm)
      );
    }
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredArticles(filtered);
  }, [category, searchTerm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
      {filteredArticles.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl text-gray-600">No articles found</h3>
        </div>
      )}
    </div>
  );
}

function ArticleListFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-lg p-6 h-64 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

function FeaturedArticle({ article }: ArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href={`/articles/${article.id}`} className="group">
        <div className="relative h-[60vh] min-h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full">
                {article.category}
              </span>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                {new Date(article.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif group-hover:text-blue-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-300 text-lg mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {Math.ceil(article.content.split(' ').length / 200)} min read
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SearchBar() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('searchTerm') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('searchTerm', e.target.value);
    window.history.pushState(null, '', `?${newParams.toString()}`);
  };

  return (
    <div className="relative flex-grow">
      <FontAwesomeIcon 
        icon={faSearch} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function CategoryFilter() {
  const searchParams = useSearchParams();
  const categories = Array.from(new Set(publications.map(p => p.category)));

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('category', category);
    window.history.pushState(null, '', `?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      <button
        onClick={() => handleCategoryChange('')}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
          searchParams?.get('category') === '' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            searchParams?.get('category') === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Articles</h1>
          <p className="text-xl text-blue-100">
            Discover insights, tips, and stories about pregnancy and motherhood
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Suspense fallback={<div className="h-10 bg-gray-100 rounded animate-pulse flex-grow" />}>
              <SearchBar />
            </Suspense>
            <Suspense fallback={<div className="h-10 bg-gray-100 rounded w-full md:w-auto animate-pulse" />}>
              <CategoryFilter />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<ArticleListFallback />}>
          <ArticleList />
        </Suspense>
      </div>
    </div>
  );
}
