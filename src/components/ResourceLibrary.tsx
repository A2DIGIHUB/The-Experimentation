'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resources = [
  {
    category: 'Medical Information',
    items: [
      {
        title: 'Understanding Sickle Cell Disease',
        description: 'A comprehensive guide to understanding SCD, its causes, symptoms, and treatments.',
        type: 'PDF',
        link: '#',
        tags: ['basics', 'symptoms', 'treatment', 'guide']
      },
      {
        title: 'Treatment Options Guide',
        description: 'Detailed information about current treatment options and emerging therapies.',
        type: 'Article',
        link: '#',
        tags: ['treatment', 'therapy', 'medicine']
      },
      {
        title: 'Managing Pain Crisis',
        description: 'Guidelines for managing sickle cell pain crisis at home and when to seek help.',
        type: 'PDF',
        link: '#',
        tags: ['pain', 'crisis', 'management', 'emergency']
      }
    ]
  },
  {
    category: 'Patient Support',
    items: [
      {
        title: 'Support Group Directory',
        description: 'Find local and online support groups for patients and families.',
        type: 'Directory',
        link: '#',
        tags: ['support', 'community', 'groups']
      },
      {
        title: 'Nutrition Guidelines',
        description: 'Dietary recommendations for managing sickle cell disease.',
        type: 'PDF',
        link: '#',
        tags: ['nutrition', 'diet', 'health']
      },
      {
        title: 'Exercise Guidelines',
        description: 'Safe exercise recommendations for SCD patients.',
        type: 'Article',
        link: '#',
        tags: ['exercise', 'fitness', 'activity']
      }
    ]
  },
  {
    category: 'Research & Clinical Trials',
    items: [
      {
        title: 'Current Research Updates',
        description: 'Latest developments in sickle cell research and treatment.',
        type: 'Article',
        link: '#',
        tags: ['research', 'updates', 'development']
      },
      {
        title: 'Clinical Trial Opportunities',
        description: 'Information about ongoing clinical trials and how to participate.',
        type: 'Directory',
        link: '#',
        tags: ['clinical trials', 'research', 'participation']
      }
    ]
  }
];

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState(resources[0].category);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Combine all resources into a flat array for searching
  const allResources = useMemo(() => 
    resources.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.category
      }))
    ),
    []
  );

  // Filter resources based on search query and selected category
  const filteredResources = useMemo(() => {
    if (!searchQuery) {
      return isSearching 
        ? allResources 
        : resources.find(r => r.category === selectedCategory)?.items || [];
    }

    const query = searchQuery.toLowerCase();
    return allResources.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query));
      
      return isSearching ? matchesSearch : matchesSearch && item.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory, isSearching, allResources]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Resource Library</h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search resources..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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

        {/* Category Navigation */}
        {!isSearching && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {resources.map((resource) => (
              <button
                key={resource.category}
                onClick={() => setSelectedCategory(resource.category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === resource.category
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {resource.category}
              </button>
            ))}
          </div>
        )}

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredResources.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {isSearching && (
                  <p className="text-sm text-gray-500 mb-4">
                    Category: {item.category}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-primary-blue text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={item.link}
                  className="text-primary-blue hover:text-blue-700 font-medium flex items-center"
                >
                  Access Resource
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredResources.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No resources found matching your search criteria.
          </div>
        )}
      </div>
    </section>
  );
}
