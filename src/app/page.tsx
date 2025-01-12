import Image from 'next/image'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import ArticleCard from '@/components/ArticleCard'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-secondary-teal text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey to Better Health Starts Here
            </h1>
            <p className="text-xl mb-8">
              Discover expert health insights and join our mission to support sickle cell awareness
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/articles" className="btn-primary bg-white text-primary-blue hover:bg-gray-100">
                Read Articles
              </Link>
              <Link href="/sickle-cell" className="btn-primary border-2 border-white hover:bg-white hover:text-primary-blue">
                Learn About Sickle Cell
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample articles - replace with dynamic data */}
            <ArticleCard
              title="Understanding Sickle Cell Disease"
              excerpt="Learn about the latest research and treatments for sickle cell disease..."
              category="Health"
              readTime="5 min read"
              image="/images/article1.jpg"
              slug="understanding-sickle-cell"
            />
            <ArticleCard
              title="Nutrition Tips for Wellness"
              excerpt="Discover the best foods to maintain your health and boost immunity..."
              category="Wellness"
              readTime="4 min read"
              image="/images/article2.jpg"
              slug="nutrition-tips"
            />
            <ArticleCard
              title="Mental Health Awareness"
              excerpt="Expert advice on maintaining good mental health in challenging times..."
              category="Mental Health"
              readTime="6 min read"
              image="/images/article3.jpg"
              slug="mental-health-awareness"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <NewsletterSignup />
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-blue mb-2">1000+</div>
              <div className="text-gray-600">Patients Supported</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-blue mb-2">50+</div>
              <div className="text-gray-600">Healthcare Partners</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-blue mb-2">$2M+</div>
              <div className="text-gray-600">Raised for Research</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
