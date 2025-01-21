import Image from 'next/image'
import Link from 'next/link'
import { Publication } from '@/data/publications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons'

interface ArticleCardProps {
  article: Publication;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/articles/${article.id}`} className="group">
        <div className="relative h-48">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              {article.category}
            </span>
            <div className="flex items-center text-xs">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              {Math.ceil(article.content.split(' ').length / 200)} min
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {article.author}
            </div>
            <time className="text-gray-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard
