'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
