'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

// Sample articles data (in a real app, this would come from an API or database)
const articles = [
  {
    id: 1,
    title: 'Understanding Sickle Cell Disease: A Comprehensive Guide',
    excerpt: 'Learn about the causes, symptoms, and latest treatments for sickle cell disease in this comprehensive guide.',
    content: `
      Sickle cell disease (SCD) is a group of inherited red blood cell disorders. In someone who has SCD, the hemoglobin protein is abnormal, causing red blood cells to become rigid, sticky, and crescent-shaped (like a sickle). When these sickle cells travel through small blood vessels, they can get stuck and clog the blood flow.

      ## What Causes Sickle Cell Disease?

      Sickle cell disease is caused by a mutation in the gene that tells your body to make hemoglobin. Hemoglobin is the protein in red blood cells that carries oxygen throughout the body. The mutation causes the body to make abnormal hemoglobin that results in the red blood cells becoming sickle-shaped.

      ## Common Symptoms

      - Pain episodes or crises
      - Anemia
      - Swelling of hands and feet
      - Frequent infections
      - Vision problems
      - Delayed growth
      
      ## Latest Treatments

      Recent advances in sickle cell disease treatment include:

      1. Gene Therapy
      2. Bone Marrow Transplantation
      3. New Medications
      4. Hydroxyurea
      5. Blood Transfusions

      ## Living with Sickle Cell Disease

      While sickle cell disease is a serious condition, many people with the disease can live full lives by learning to manage their condition and working closely with their healthcare providers.
    `,
    author: 'Dr. Sarah Johnson',
    date: '2025-01-05',
    readTime: '8 min read',
    category: 'Medical',
    image: '/images/article1.jpg',
    tags: ['Sickle Cell', 'Disease', 'Treatment'],
    authorImage: '/images/team/sarah.jpg',
    authorBio: 'Dr. Johnson is a leading hematologist with over 15 years of experience in treating sickle cell disease.'
  },
  // Add more articles...
];

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find(a => a.id === Number(params.id));

  if (!article) {
    return (
      <div className="min-h-screen py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/articles" className="text-primary-blue hover:underline">
            Return to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <article className="container-custom max-w-4xl">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary-blue text-white text-sm font-medium rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {format(parseISO(article.date), 'MMMM d, yyyy')}
            </span>
            <span className="text-sm text-gray-500">{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={article.authorImage}
                alt={article.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-gray-500">Medical Director</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">About the Author</h3>
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={article.authorImage}
                alt={article.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">{article.author}</h4>
              <p className="text-gray-600">{article.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t flex justify-between">
          <Link
            href="/articles"
            className="text-primary-blue hover:underline flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </Link>
        </div>
      </article>
    </main>
  );
}
