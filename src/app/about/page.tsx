import { Metadata } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'About Us | The-Experimentation',
  description: 'Learn about our mission to make science accessible and engaging through interactive experiments and clear explanations.',
};

const teamMembers = [
  {
    name: 'Dr. Alex Thompson',
    role: 'Scientific Director',
    image: '/images/team/alex.jpg',
    bio: 'Dr. Thompson has over 15 years of experience in science communication and research.'
  },
  {
    name: 'Sarah Chen',
    role: 'Education Director',
    image: '/images/team/sarah.jpg',
    bio: 'Sarah leads our educational initiatives and experiment development programs.'
  },
  {
    name: 'Dr. James Wilson',
    role: 'Research Lead',
    image: '/images/team/james.jpg',
    bio: 'Dr. Wilson oversees our research validation and scientific accuracy.'
  },
  {
    name: 'Maria Rodriguez',
    role: 'Community Manager',
    image: '/images/team/maria.jpg',
    bio: 'Maria manages our community engagement and educational workshops.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making Science Accessible to Everyone
          </h1>
          <p className="text-xl text-gray-600">
            We believe that understanding science should be engaging, interactive, and accessible to all.
            Through clear explanations and hands-on experiments, we're making complex scientific concepts approachable.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At The-Experimentation, we're dedicated to breaking down the barriers between complex scientific concepts
                and everyday understanding. Our platform serves as a bridge between cutting-edge research and practical,
                hands-on learning experiences.
              </p>
              <p className="text-lg text-gray-600">
                Through interactive experiments, clear explanations, and engaging content, we're building a community
                where curiosity thrives and scientific discovery becomes an adventure accessible to everyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative h-[400px]"
            >
              <Image
                src="/images/about/mission.jpg"
                alt="Our Mission"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold mb-4">Accessibility</h3>
              <p className="text-blue-200">
                Making scientific knowledge accessible to everyone, regardless of their background.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold mb-4">Engagement</h3>
              <p className="text-blue-200">
                Creating interactive and engaging ways to learn about science.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold mb-4">Accuracy</h3>
              <p className="text-blue-200">
                Ensuring all our content is scientifically accurate and well-researched.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
