'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    number: '1000+',
    label: 'Scientific Articles',
    description: 'Curated and explained in simple terms'
  },
  {
    number: '50+',
    label: 'Interactive Experiments',
    description: 'That you can try at home'
  },
  {
    number: '100K+',
    label: 'Monthly Readers',
    description: 'Learning about science'
  },
  {
    number: '24/7',
    label: 'Expert Support',
    description: 'To answer your questions'
  }
];

export default function ScienceStats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2, type: 'spring' }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {stat.number}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-blue-100">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
