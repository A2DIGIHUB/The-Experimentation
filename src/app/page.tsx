import Image from 'next/image';
import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScienceHighlight from '@/components/ScienceHighlight';
import ExperimentShowcase from '@/components/ExperimentShowcase';
import ScienceStats from '@/components/ScienceStats';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The-Experimentation
            </h1>
            <p className="text-2xl mb-4">Where Science Comes to Life</p>
            <p className="text-xl mb-8">
              Discover the wonders of science through interactive experiments, engaging articles, and expert explanations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/articles" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Explore Articles
              </Link>
              <Link href="/resources" className="btn-primary border-2 border-white hover:bg-white hover:text-blue-600">
                Start Experimenting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Science Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest in Science</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ScienceHighlight
              title="The Mystery of Dark Matter"
              description="Uncover the invisible force that holds galaxies together."
              imageUrl="/images/dark-matter.jpg"
              category="Physics"
            />
            <ScienceHighlight
              title="CRISPR Revolution"
              description="How gene editing is transforming medicine and biology."
              imageUrl="/images/crispr.jpg"
              category="Biology"
            />
            <ScienceHighlight
              title="Quantum Computing Basics"
              description="Understanding the future of computation."
              imageUrl="/images/quantum.jpg"
              category="Technology"
            />
          </div>
        </div>
      </section>

      {/* Experiment Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ExperimentShowcase />
        </div>
      </section>

      {/* Science Stats */}
      <ScienceStats />

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Curious</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for weekly science experiments, breakthrough discoveries, and fascinating insights.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
