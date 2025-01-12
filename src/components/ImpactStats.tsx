'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: '10K+',
    label: 'Patients Supported',
    description: 'Direct assistance and support provided to individuals with Sickle Cell Disease'
  },
  {
    value: '$2M+',
    label: 'Research Funded',
    description: 'Invested in groundbreaking research for better treatments and potential cures'
  },
  {
    value: '50+',
    label: 'Healthcare Partners',
    description: 'Collaborating with leading healthcare institutions worldwide'
  },
  {
    value: '100+',
    label: 'Community Events',
    description: 'Annual awareness and support events organized across the country'
  }
];

export default function ImpactStats() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-gray-50"
            >
              <div className="text-4xl font-bold text-primary-blue mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
