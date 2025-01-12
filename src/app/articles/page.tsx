import { Metadata } from 'next'
import ArticleGrid from '@/components/ArticleGrid'
import FeaturedArticle from '@/components/FeaturedArticle'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = {
  title: 'Health & Wellness Articles | Health Blog',
  description: 'Explore our collection of expert-written articles on health, wellness, and sickle cell awareness.',
}

// Sample articles data (in a real app, this would come from a CMS or API)
const articles = [
  {
    id: 1,
    title: 'Understanding Sickle Cell Disease: A Comprehensive Guide',
    excerpt: 'Learn about the causes, symptoms, and latest treatments for sickle cell disease in this comprehensive guide.',
    author: 'Dr. Sarah Johnson',
    date: '2025-01-05',
    readTime: '8 min read',
    category: 'Medical',
    image: '/images/article1.jpg',
    featured: true,
    tags: ['Sickle Cell', 'Disease', 'Treatment']
  },
  {
    id: 2,
    title: 'Nutrition Tips for Managing Sickle Cell Disease',
    excerpt: 'Discover the best dietary practices and nutritional guidelines for managing sickle cell disease effectively.',
    author: 'Lisa Chen, RD',
    date: '2025-01-03',
    readTime: '6 min read',
    category: 'Nutrition',
    image: '/images/article2.jpg',
    tags: ['Nutrition', 'Diet', 'Health']
  },
  // Add more articles...
]

export default function ArticlesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Health & Wellness Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert insights and advice on health, wellness, and living with sickle cell disease.
          </p>
        </div>

        {/* Featured Article */}
        <section className="mb-16">
          <FeaturedArticle
            article={articles.find(article => article.featured) || articles[0]}
          />
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <CategoryFilter
            categories={['All', 'Medical', 'Nutrition', 'Lifestyle', 'Research', 'Community']}
          />
        </section>

        {/* Articles Grid */}
        <section>
          <ArticleGrid articles={articles} />
        </section>
      </div>
    </main>
  )
}
