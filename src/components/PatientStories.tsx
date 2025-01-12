'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const stories = [
  {
    id: 1,
    name: "Sarah's Journey",
    quote: "Through the foundation's support, I found strength I never knew I had.",
    content: "Living with Sickle Cell Disease hasn't been easy, but the community here has made all the difference...",
    image: "/images/patient-1.jpg"
  },
  {
    id: 2,
    name: "David's Story",
    quote: "Education and awareness make a real difference in how we're treated.",
    content: "When I was diagnosed, I felt alone. Now I'm part of a strong, supportive community...",
    image: "/images/patient-2.jpg"
  },
  {
    id: 3,
    name: "Maria's Experience",
    quote: "Research gives us hope for a better future.",
    content: "Thanks to new treatments developed through research, I can manage my condition better...",
    image: "/images/patient-3.jpg"
  }
];

export default function PatientStories() {
  const [activeStory, setActiveStory] = useState(0);

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Patient Stories</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={stories[activeStory].image}
                    alt={stories[activeStory].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{stories[activeStory].name}</h3>
                  <blockquote className="text-lg italic text-gray-600 mb-6">
                    "{stories[activeStory].quote}"
                  </blockquote>
                  <p className="text-gray-700">{stories[activeStory].content}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevStory}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Previous story"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextStory}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Next story"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
