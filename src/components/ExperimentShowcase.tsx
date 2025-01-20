'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const experiments = [
  {
    id: 1,
    title: "DNA Extraction",
    difficulty: "Easy",
    duration: "30 mins",
    description: "Learn how to extract DNA from fruits using household items.",
    materials: ["Banana", "Rubbing alcohol", "Dish soap", "Salt"],
    steps: [
      "Mash the banana in a plastic bag",
      "Add dish soap and salt solution",
      "Filter the mixture",
      "Add cold rubbing alcohol"
    ]
  },
  {
    id: 2,
    title: "Color Changing Milk",
    difficulty: "Beginner",
    duration: "15 mins",
    description: "Watch as food coloring dances in milk when dish soap is added.",
    materials: ["Milk", "Food coloring", "Dish soap", "Cotton swab"],
    steps: [
      "Pour milk in a plate",
      "Add drops of food coloring",
      "Dip cotton swab in dish soap",
      "Touch the milk surface"
    ]
  }
];

export default function ExperimentShowcase() {
  const [activeExperiment, setActiveExperiment] = useState(experiments[0]);

  return (
    <div className="bg-gray-50 p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Try These Experiments!</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {experiments.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveExperiment(exp)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                activeExperiment.id === exp.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-sm opacity-80">{exp.description}</p>
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeExperiment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{activeExperiment.title}</h3>
            <div className="space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {activeExperiment.difficulty}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {activeExperiment.duration}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Materials Needed:</h4>
            <ul className="list-disc list-inside space-y-1">
              {activeExperiment.materials.map((material, index) => (
                <li key={index} className="text-gray-600">{material}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Steps:</h4>
            <ol className="list-decimal list-inside space-y-2">
              {activeExperiment.steps.map((step, index) => (
                <li key={index} className="text-gray-600">{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
