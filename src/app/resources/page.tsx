'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Sample resources data
const resources = [
  {
    id: 1,
    title: 'Patient Care Guidelines',
    description: 'Comprehensive guidelines for managing sickle cell disease symptoms and treatment.',
    category: 'Medical',
    type: 'PDF',
    link: '/resources/patient-care-guidelines.pdf',
    icon: '📋',
    featured: true
  },
  {
    id: 2,
    title: 'Nutrition and Diet Plan',
    description: 'Dietary recommendations and meal plans for sickle cell patients.',
    category: 'Lifestyle',
    type: 'PDF',
    link: '/resources/nutrition-guide.pdf',
    icon: '🥗',
    featured: true
  },
  {
    id: 3,
    title: 'Support Group Directory',
    description: 'Find local and online support groups for patients and families.',
    category: 'Community',
    type: 'External Link',
    link: 'https://example.com/support-groups',
    icon: '👥'
  },
  {
    id: 4,
    title: 'Research Papers Collection',
    description: 'Latest research papers and studies on sickle cell disease.',
    category: 'Research',
    type: 'External Link',
    link: 'https://example.com/research',
    icon: '📚'
  },
  {
    id: 5,
    title: 'Emergency Care Card Template',
    description: 'Printable emergency care card with important medical information.',
    category: 'Medical',
    type: 'PDF',
    link: '/resources/emergency-card.pdf',
    icon: '🏥'
  }
];

const categories = ['All', 'Medical', 'Lifestyle', 'Community', 'Research'];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <main className="min-h-screen py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Resource Library
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive collection of resources for patients, families, and healthcare providers.
          </p>
        </div>

        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map(resource => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={resource.link} className="block p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{resource.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-sm">
                          {resource.category}
                        </span>
                        <span className="text-sm text-gray-500">{resource.type}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={resource.link} className="block p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{resource.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-sm">
                            {resource.category}
                          </span>
                          <span className="text-sm text-gray-500">{resource.type}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No resources found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-primary-blue/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive updates about new resources and research findings.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
